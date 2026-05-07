"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./Shaders";

interface FractalGlassProps {
  lerpFactor?: number;
  parallaxStrength?: number;
  distortionMultiplier?: number;
  glassStrength?: number;
  glassSmoothness?: number;
  stripesFrequency?: number;
  edgePadding?: number;
  quality?: number;
  showRefraction?: boolean;
  className?: string;
}

const FractalGlass: React.FC<FractalGlassProps> = ({
  lerpFactor = 0.035,
  parallaxStrength = 0.1,
  distortionMultiplier = 10,
  glassStrength = 2.0,
  glassSmoothness = 0.0001,
  stripesFrequency = 20,
  edgePadding = 0.1,
  quality = 1.0,
  showRefraction = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!containerRef.current) return;

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    // clamp pixel ratio based on quality to reduce fragment workload on low-end devices
    const pxRatio = quality < 0.5 ? 1 : Math.min(window.devicePixelRatio, 2);
    rendererRef.current.setPixelRatio(pxRatio);
    containerRef.current.appendChild(rendererRef.current.domElement);

    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uMouse: {
          value: new THREE.Vector2(mouseRef.current.x, mouseRef.current.y),
        },
        uParallaxStrength: { value: parallaxStrength },
        uDistortionMultiplier: { value: distortionMultiplier },
        uGlassStrength: { value: glassStrength },
        ustripesFrequency: { value: stripesFrequency },
        uglassSmoothness: { value: glassSmoothness },
        uEdgePadding: { value: edgePadding },
        uQuality: { value: quality },
        uShowRefraction: { value: showRefraction ? 1.0 : 0.0 },
        iTime: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    meshRef.current = new THREE.Mesh(geometry, materialRef.current);
    sceneRef.current.add(meshRef.current);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        if (meshRef.current.material instanceof THREE.Material) {
          meshRef.current.material.dispose();
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uParallaxStrength.value = parallaxStrength;
    materialRef.current.uniforms.uDistortionMultiplier.value =
      distortionMultiplier;
    materialRef.current.uniforms.uGlassStrength.value = glassStrength;
    materialRef.current.uniforms.ustripesFrequency.value = stripesFrequency;
    materialRef.current.uniforms.uglassSmoothness.value = glassSmoothness;
    materialRef.current.uniforms.uEdgePadding.value = edgePadding;
    materialRef.current.uniforms.uQuality.value = quality;
    materialRef.current.uniforms.uShowRefraction.value = showRefraction ? 1.0 : 0.0;
  }, [
    parallaxStrength,
    distortionMultiplier,
    glassStrength,
    stripesFrequency,
    glassSmoothness,
    edgePadding,
    quality,
    showRefraction,
  ]);

  const handleMouseMove = (e: MouseEvent) => {
    targetMouseRef.current.x = e.clientX / window.innerWidth;
    targetMouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
  };

  const handleResize = () => {
    if (!rendererRef.current || !materialRef.current) return;

    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    materialRef.current.uniforms.uResolution.value.set(
      window.innerWidth,
      window.innerHeight
    );
  };

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  const animate = () => {
    if (
      !rendererRef.current ||
      !sceneRef.current ||
      !cameraRef.current ||
      !materialRef.current
    )
      return;

    animationRef.current = requestAnimationFrame(animate);

    mouseRef.current.x = lerp(
      mouseRef.current.x,
      targetMouseRef.current.x,
      lerpFactor
    );
    mouseRef.current.y = lerp(
      mouseRef.current.y,
      targetMouseRef.current.y,
      lerpFactor
    );
    materialRef.current.uniforms.uMouse.value.set(
      mouseRef.current.x,
      mouseRef.current.y
    );
    materialRef.current.uniforms.iTime.value = (Date.now() - startTimeRef.current) * 0.001;

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  return (
    <div
      ref={containerRef}
      className={`${className}`}
    />
  );
};

export default FractalGlass;
