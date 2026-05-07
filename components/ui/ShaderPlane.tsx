'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TileShader() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = window.innerWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      iResolution: { value: new THREE.Vector3(width, height, 1) },
      iTime: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      fragmentShader: `
        uniform vec3 iResolution;
        uniform float iTime;

        const float squares = 10.0;
        const float amt = 0.2;
        const float offset = 0.125;
        #define filmGrainIntensity 0.1

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

        // Background gradient shader (from ShaderToy)
        vec3 background(vec2 uv) {
            float aspectRatio = iResolution.x / iResolution.y;
            vec2 tuv = uv - 0.5;

            float degree = noise(vec2(iTime*.05, tuv.x*tuv.y));

            tuv.y *= 1./aspectRatio;
            tuv *= Rot(radians((degree-.5)*720.+180.));
            tuv.y *= aspectRatio;

            float frequency = 5.;
            float amplitude = 30.;
            float speed = iTime * 2.;
            tuv.x += sin(tuv.y*frequency+speed)/amplitude;
            tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
            
            vec3 swampyBlack = vec3(32, 42, 50) / 255.0;
            vec3 persimmonOrange = vec3(199.0, 56.0, 32.0) / 255.0;
            vec3 darkAmber = vec3(233, 160, 75) / 255.0;
            vec3 darkGreen = vec3(140.0, 183.0, 136.0) / 255.0;

            float cycle = sin(iTime * 0.5);
            float t = (sign(cycle) * pow(abs(cycle), 0.6) + 1.) / 2.;
            vec3 color1 = mix(darkAmber, persimmonOrange, t);
            vec3 color2 = mix(darkGreen, swampyBlack, t);
            vec3 color3 = mix(swampyBlack, persimmonOrange, t);
            vec3 color4 = mix(persimmonOrange, darkAmber, t);

            vec3 layer1 = mix(color3, color2, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
            vec3 layer2 = mix(color4, color1, smoothstep(-.3, .2, (tuv*Rot(radians(-5.))).x));
            
            vec3 color = mix(layer1, layer2, smoothstep(.5, -.3, tuv.y));

            color -= filmGrainNoise(uv) * filmGrainIntensity;
            return color;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;

          vec2 tc = uv;
          tc.x *= iResolution.x / iResolution.y;

          vec2 tile = vec2(fract(tc.x * squares), tc.y);

          vec3 col = background(uv + (tile * amt) - offset);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate(time: number) {
      uniforms.iTime.value = time * 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate(0);

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 h-[105dvh] md:h-[118dvh] overflow-hidden" />;
}
