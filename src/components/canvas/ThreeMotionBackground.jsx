import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * ThreeMotionBackground — Bold, High-Visibility 3D Scrollytelling Universe across ALL sections.
 * Vanilla Three.js + GSAP (Zero fiber dependencies, zero ConcurrentRoot crashes).
 * Positioned at zIndex: 1 so it floats visibly ABOVE solid section backgrounds and BEHIND section cards (zIndex: 2).
 * 6 large glowing 3D structures move and rotate in depth as the user scrolls.
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

        // 2. High-Visibility Glowing Materials
        const amberMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            wireframe: true,
            transparent: true,
            opacity: 0.65
        });

        const indigoMat = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        const violetMat = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.55
        });

        const emeraldMat = new THREE.MeshBasicMaterial({
            color: 0x10b981,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });

        // 3. 6 Prominent 3D Geometries positioned across scroll depths (y = 12 down to y = -140)
        const meshes = [];

        // Mesh 1: Top Left TorusKnot (Hero / About border)
        const torusGeo = new THREE.TorusKnotGeometry(4.5, 1.1, 80, 16);
        const torus = new THREE.Mesh(torusGeo, amberMat);
        torus.position.set(-16, 5, -8);
        scene.add(torus);
        meshes.push({ mesh: torus, rx: 0.005, ry: 0.008 });

        // Mesh 2: Mid Right Icosahedron (Skills section area)
        const icoGeo = new THREE.IcosahedronGeometry(6, 1);
        const ico = new THREE.Mesh(icoGeo, indigoMat);
        ico.position.set(18, -25, -12);
        scene.add(ico);
        meshes.push({ mesh: ico, rx: -0.006, ry: 0.007 });

        // Mesh 3: Left Octahedron (Education / Experience area)
        const octGeo = new THREE.OctahedronGeometry(5.5, 2);
        const oct = new THREE.Mesh(octGeo, violetMat);
        oct.position.set(-17, -55, -10);
        scene.add(oct);
        meshes.push({ mesh: oct, rx: 0.007, ry: -0.005 });

        // Mesh 4: Right Dodecahedron (Projects section area)
        const dodGeo = new THREE.DodecahedronGeometry(6.5, 1);
        const dod = new THREE.Mesh(dodGeo, amberMat);
        dod.position.set(17, -85, -14);
        scene.add(dod);
        meshes.push({ mesh: dod, rx: -0.005, ry: -0.006 });

        // Mesh 5: Bottom Left Cyber Ring (Achievements area)
        const ringGeo = new THREE.TorusGeometry(7, 1.4, 24, 64);
        const ring = new THREE.Mesh(ringGeo, emeraldMat);
        ring.position.set(-16, -115, -12);
        scene.add(ring);
        meshes.push({ mesh: ring, rx: 0.008, ry: 0.004 });

        // Mesh 6: Bottom Right TorusKnot (Contact / Footer area)
        const bottomTorusGeo = new THREE.TorusKnotGeometry(5, 1.2, 64, 16);
        const bottomTorus = new THREE.Mesh(bottomTorusGeo, indigoMat);
        bottomTorus.position.set(16, -145, -10);
        scene.add(bottomTorus);
        meshes.push({ mesh: bottomTorus, rx: 0.006, ry: 0.006 });

        // 4. Floating 3D Starfield across entire scroll depth (-160 to 20)
        const pointsCount = 600;
        const posArray = new Float32Array(pointsCount * 3);
        const colorArray = new Float32Array(pointsCount * 3);

        const c1 = new THREE.Color(0xf59e0b); // amber
        const c2 = new THREE.Color(0x6366f1); // indigo
        const c3 = new THREE.Color(0x8b5cf6); // violet

        for (let i = 0; i < pointsCount; i++) {
            posArray[i * 3]     = (Math.random() - 0.5) * 80;
            posArray[i * 3 + 1] = (Math.random() * 180) - 155; // Spread from +25 down to -155
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 45 - 8;

            const r = Math.random();
            const chosen = r > 0.66 ? c1 : r > 0.33 ? c2 : c3;
            colorArray[i * 3]     = chosen.r;
            colorArray[i * 3 + 1] = chosen.g;
            colorArray[i * 3 + 2] = chosen.b;
        }

        const pointsGeo = new THREE.BufferGeometry();
        pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        pointsGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const pointsMat = new THREE.PointsMaterial({
            size: 0.4,
            vertexColors: true,
            transparent: true,
            opacity: 0.75
        });
        const starField = new THREE.Points(pointsGeo, pointsMat);
        scene.add(starField);

        // 5. Interaction & GSAP Scrollytelling hooks
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 8;
            mouseY = (e.clientY / window.innerHeight - 0.5) * -8;
        };

        const onScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // Map scroll pixel offset to Three.js world Y coordinate (camera descends with page scroll)
            // As user scrolls 1000px down, camera drops by ~28 units, revealing each geometry!
            gsap.to(camera.position, {
                y: -(scrollY * 0.028),
                duration: 0.9,
                ease: 'power2.out'
            });
            starField.rotation.y = scrollY * 0.0005;
            scene.rotation.z = scrollY * 0.0001;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll, { passive: true });

        // Initial check
        onScroll();

        // Resize handler
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // 6. Render loop
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            // Rotate all 6 meshes autonomously
            for (const { mesh, rx, ry } of meshes) {
                mesh.rotation.x += rx;
                mesh.rotation.y += ry;
            }

            // Smooth mouse tilt tracking across entire scene
            scene.rotation.y += (mouseX * 0.06 - scene.rotation.y) * 0.06;
            scene.rotation.x += (mouseY * 0.06 - scene.rotation.x) * 0.06;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (container && renderer.domElement && container.contains(renderer.domElement)) {
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
                zIndex: 1, /* Flotates visibly above section backgrounds and below section content (zIndex: 2) */
                overflow: 'hidden'
            }}
        />
    );
};

export default ThreeMotionBackground;
