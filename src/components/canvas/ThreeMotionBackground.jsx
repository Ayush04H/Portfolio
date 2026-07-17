import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * ThreeMotionBackground — Pure Vanilla Three.js + GSAP 3D Floating Geometry Scene
 * Zero @react-three/fiber dependency (prevents ConcurrentRoot reconciler crash).
 * Renders glowing wireframe Icosahedrons, TorusKnots, and floating stars that
 * rotate smoothly with GSAP and react dynamically to mouse & scroll.
 */
const ThreeMotionBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // 1. Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        container.appendChild(renderer.domElement);

        // 2. Materials (Amber Gold & Electric Indigo wireframe + glow)
        const amberMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            wireframe: true,
            transparent: true,
            opacity: 0.28
        });

        const indigoMat = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.25
        });

        const violetMat = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.22
        });

        // 3. Geometries — Floating 3D objects
        const meshes = [];

        // Left top torus
        const torusGeo = new THREE.TorusKnotGeometry(3, 0.8, 64, 16);
        const torus = new THREE.Mesh(torusGeo, amberMat);
        torus.position.set(-14, 8, -10);
        scene.add(torus);
        meshes.push({ mesh: torus, rx: 0.004, ry: 0.006 });

        // Right mid icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(4.5, 1);
        const ico = new THREE.Mesh(icoGeo, indigoMat);
        ico.position.set(15, -2, -15);
        scene.add(ico);
        meshes.push({ mesh: ico, rx: -0.003, ry: 0.005 });

        // Bottom left octahedron
        const octGeo = new THREE.OctahedronGeometry(3.5, 2);
        const oct = new THREE.Mesh(octGeo, violetMat);
        oct.position.set(-12, -12, -8);
        scene.add(oct);
        meshes.push({ mesh: oct, rx: 0.005, ry: -0.004 });

        // Floating particle points in 3D space
        const pointsCount = 450;
        const posArray = new Float32Array(pointsCount * 3);
        const colorArray = new Float32Array(pointsCount * 3);

        const c1 = new THREE.Color(0xf59e0b); // amber
        const c2 = new THREE.Color(0x6366f1); // indigo

        for (let i = 0; i < pointsCount; i++) {
            posArray[i * 3]     = (Math.random() - 0.5) * 65;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 65;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;

            const chosen = Math.random() > 0.5 ? c1 : c2;
            colorArray[i * 3]     = chosen.r;
            colorArray[i * 3 + 1] = chosen.g;
            colorArray[i * 3 + 2] = chosen.b;
        }

        const pointsGeo = new THREE.BufferGeometry();
        pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        pointsGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const pointsMat = new THREE.PointsMaterial({
            size: 0.35,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        const starField = new THREE.Points(pointsGeo, pointsMat);
        scene.add(starField);

        // 4. Interaction & GSAP animation hooks
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 6;
            mouseY = (e.clientY / window.innerHeight - 0.5) * -6;
        };

        const onScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // Parallax camera and starfield rotation with scroll
            gsap.to(camera.position, {
                y: -(scrollY * 0.015),
                duration: 1.2,
                ease: 'power2.out'
            });
            starField.rotation.y = scrollY * 0.0004;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Resize handler
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // 5. Render loop
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            // Rotate meshes
            for (const { mesh, rx, ry } of meshes) {
                mesh.rotation.x += rx;
                mesh.rotation.y += ry;
            }

            // Smooth mouse tilt
            scene.rotation.y += (mouseX * 0.08 - scene.rotation.y) * 0.05;
            scene.rotation.x += (mouseY * 0.08 - scene.rotation.x) * 0.05;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden'
            }}
        />
    );
};

export default ThreeMotionBackground;
