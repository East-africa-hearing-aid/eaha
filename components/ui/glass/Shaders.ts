export const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

export const fragmentShader = `
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uParallaxStrength;
      uniform float uDistortionMultiplier;
      uniform float uGlassStrength;
      uniform float ustripesFrequency;
      uniform float uglassSmoothness;
      uniform float uEdgePadding;
      // 0.0 = low quality (faster), 1.0 = high quality (full detail)
      uniform float uQuality;
      // 0.0 = gradient only, 1.0 = gradient + refraction glass
      uniform float uShowRefraction;
      uniform float iTime;
      
      varying vec2 vUv;

      #define filmGrainIntensity 0.0

      mat2 Rot(float a) {
          float s = sin(a);
          float c = cos(a);
          return mat2(c, -s, s, c);
      }

      vec2 hash(vec2 p) {
          p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
          return fract(sin(p)*43758.5453);
      }

      float noise(in vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);

          float n = mix(mix(dot(-1.0+2.0*hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(-1.0+2.0*hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(-1.0+2.0*hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(-1.0+2.0*hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
          return 0.5 + 0.5*n;
      }

      float filmGrainNoise(in vec2 uv) {
          return length(hash(vec2(uv.x, uv.y)));
      }

      vec3 gradientBackground(vec2 uv) {
          float aspectRatio = uResolution.x / uResolution.y;
          
          vec2 tuv = uv - .5;

          float degree = noise(vec2(iTime*.05, tuv.x*tuv.y));

          tuv.y *= 1./aspectRatio;
          tuv *= Rot(radians((degree-.5)*720.+180.));
          tuv.y *= aspectRatio;

          // adapt parameters by quality to reduce work on low-end devices
          float frequency = mix(3.0, 5.0, uQuality);
          float amplitude = mix(60.0, 30.0, uQuality);
          float speed = iTime * mix(1.0, 2.0, uQuality);
          tuv.x += sin(tuv.y * frequency + speed) / amplitude;
          // secondary perturbation only for medium/high quality
          if (uQuality > 0.4) {
            tuv.y += sin(tuv.x * frequency * 1.5 + speed) / (amplitude * 0.5);
          }
          
          vec3 amberYellow = vec3(255.0, 190.0, 40.0) / vec3(255);
          vec3 deepBlue = vec3(26.0, 33.0, 33.0) / vec3(255);
          vec3 pink = vec3(255.0, 110.0, 40.0) / vec3(255);
          vec3 blue = vec3(255.0, 40.0, 40.0) / vec3(255);
          
          vec3 purpleHaze = vec3(26.0, 33.0, 33.0) / vec3(255);
          vec3 swampyBlack = vec3(32, 42, 50) / vec3(255);
          vec3 persimmonOrange = vec3(233, 51, 52) / vec3(255);
          vec3 darkAmber = vec3(26.0, 33.0, 33.0) / vec3(255);
          
          float cycle = sin(iTime * 0.5);
          float t = (sign(cycle) * pow(abs(cycle), 0.6) + 1.) / 2.;
          vec3 color1 = mix(amberYellow, purpleHaze, t);
          vec3 color2 = mix(deepBlue, swampyBlack, t);
          vec3 color3 = mix(pink, persimmonOrange, t);
          vec3 color4 = mix(blue, darkAmber, t);

          vec3 layer1 = mix(color3, color2, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
          vec3 layer2 = mix(color4, color1, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
          
          vec3 color = mix(layer1, layer2, smoothstep(.5, -.3, tuv.y));

          color = color - filmGrainNoise(uv) * filmGrainIntensity;
          
          return color;
      }
      
      // Original displacement (stable visual) used by high quality path
      float displacement_mod(float x, float num_stripes, float strength) {
        float modulus = 1.0 / max(1.0, num_stripes);
        return mod(x, modulus) * strength;
      }

      // High-quality fractal: original -5..5 samples using mod-based displacement
      float fractalGlassHigh(float x) {
        float d = 0.0;
        for (int i = -5; i <= 5; i++) {
          d += displacement_mod(x + float(i) * uglassSmoothness, ustripesFrequency, uGlassStrength);
        }
        d = d / 11.0;
        return x + d;
      }

      // Low-quality fractal: fewer samples and still uses mod for stable appearance
      float fractalGlassLow(float x) {
        float d = 0.0;
        for (int i = -2; i <= 2; i++) {
          d += displacement_mod(x + float(i) * uglassSmoothness, ustripesFrequency, uGlassStrength);
        }
        d = d / 5.0;
        return x + d;
      }

      float smoothEdge(float x, float padding) {
        float edge = padding;
        if (x < edge) {
          return smoothstep(0.0, edge, x);
        } else if (x > 1.0 - edge) {
          return smoothstep(1.0, 1.0 - edge, x);
        }
        return 1.0;
      }
      
      void main() {
        vec2 uv = vUv;

        if (uShowRefraction > 0.5) {
          float originalX = uv.x;

          float edgeFactor = smoothEdge(originalX, uEdgePadding);

          // blend between low and high quality fractal calculations
          float distortedLow = fractalGlassLow(originalX);
          float distortedHigh = fractalGlassHigh(originalX);
          float distortedX = mix(distortedLow, distortedHigh, uQuality);

          uv.x = mix(originalX, distortedX, edgeFactor);

          float distortionFactor = uv.x - originalX;

          float parallaxDirection = -sign(0.5 - uMouse.x);

          vec2 parallaxOffset = vec2(
            parallaxDirection * abs(uMouse.x - 0.5) * uParallaxStrength * (1.0 + abs(distortionFactor) * uDistortionMultiplier),
            0.0
          );

          parallaxOffset *= edgeFactor;

          uv += parallaxOffset;
        }

        vec3 color = gradientBackground(uv);

        gl_FragColor = vec4(color, 1.0);
      }
    `;
