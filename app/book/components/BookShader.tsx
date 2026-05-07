"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/components/ui/glass/Shaders";

const BookShader = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const w = container.clientWidth;
        const h = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        container.appendChild(renderer.domElement);

        const mouse = { x: 0.5, y: 0.5 };
        const targetMouse = { x: 0.5, y: 0.5 };
        const startTime = Date.now();

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uResolution:           { value: new THREE.Vector2(w, h) },
                uMouse:                { value: new THREE.Vector2(0.5, 0.5) },
                uParallaxStrength:     { value: 0.1 },
                uDistortionMultiplier: { value: 10 },
                uGlassStrength:        { value: 2.0 },
                ustripesFrequency:     { value: 20 },
                uglassSmoothness:      { value: 0.0001 },
                uEdgePadding:          { value: 0.1 },
                uQuality:              { value: 1.0 },
                iTime:                 { value: 0.0 },
            },
            vertexShader,
            fragmentShader,
        });

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(mesh);

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        let raf: number;

        const animate = () => {
            raf = requestAnimationFrame(animate);
            mouse.x = lerp(mouse.x, targetMouse.x, 0.035);
            mouse.y = lerp(mouse.y, targetMouse.y, 0.035);
            material.uniforms.uMouse.value.set(mouse.x, mouse.y);
            material.uniforms.iTime.value = (Date.now() - startTime) * 0.001;
            renderer.render(scene, camera);
        };
        animate();

        const onMouseMove = (e: MouseEvent) => {
            targetMouse.x = e.clientX / window.innerWidth;
            targetMouse.y = 1 - e.clientY / window.innerHeight;
        };
        window.addEventListener("mousemove", onMouseMove);

        const ro = new ResizeObserver(() => {
            const nw = container.clientWidth;
            const nh = container.clientHeight;
            renderer.setSize(nw, nh);
            material.uniforms.uResolution.value.set(nw, nh);
        });
        ro.observe(container);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMouseMove);
            ro.disconnect();
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0" />;
};

export default BookShader;
