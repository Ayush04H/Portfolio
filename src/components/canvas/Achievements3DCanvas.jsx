import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Achievements3DCanvas — Competitive Algorithmic Apex & Cyber Trophy Monolith
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / zero ConcurrentRoot errors).
 * Directly visualizes LeetCode Top 1.1% Global Rank (700+ solved) & AAROHAN 1st Runner-Up victory.
 */
const Achievements3DCanvas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 16;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        // 1. Trophy Monolith Crystal (Golden Octahedron Frame)
        const crystalGeo = new THREE.OctahedronGeometry(4.0, 0);
        const crystalMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.9 });
        const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
        group.add(crystalMesh);

        // Inner Dodecahedron Core (Algorithmic Logic Core)
        const coreGeo = new THREE.DodecahedronGeometry(2.4, 0);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: false, transparent: true, opacity: 0.35 });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        group.add(coreMesh);

        // 2. Orbiting Algorithmic Shields & Data Rings
        const shieldGeo = new THREE.TorusGeometry(5.2, 0.15, 16, 64);
        const shieldMat1 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.8 });
        const shieldMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.7 });

        const shieldRing1 = new THREE.Mesh(shieldGeo, shieldMat1);
        shieldRing1.rotation.x = Math.PI / 3;
        group.add(shieldRing1);

        const shieldRing2 = new THREE.Mesh(shieldGeo, shieldMat2);
        shieldRing2.rotation.y = Math.PI / 3;
        group.add(shieldRing2);

        // 3. Victory Sparks (Golden Particle Cloud)
        const pCount = 130;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 5.6 + Math.random() * 2.5;
            pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pPos[i * 3 + 2] = r * Math.cos(phi);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const victorySparks = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.22, transparent: true, opacity: 0.9 }));
        group.add(victorySparks);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        };

        const onClick = () => {
            gsap.to(group.rotation, { y: group.rotation.y + Math.PI * 1.5, duration: 1.2, ease: 'power3.out' });
            gsap.to(crystalMesh.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' });
            gsap.to(coreMesh.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' });
        };

        window.addEventListener('mousemove', onMouseMove);
        container.addEventListener('click', onClick);

        const onResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);

        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            crystalMesh.rotation.y += 0.007;
            crystalMesh.rotation.z += 0.004;
            coreMesh.rotation.x -= 0.009;
            coreMesh.rotation.y += 0.008;
            shieldRing1.rotation.z += 0.006;
            shieldRing2.rotation.x -= 0.005;
            victorySparks.rotation.y += 0.003;

            group.rotation.y += (mouseX - group.rotation.y) * 0.08;
            group.rotation.x += (mouseY - group.rotation.x) * 0.08;

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouseMove);
            if (container) {
                container.removeEventListener('click', onClick);
                if (renderer.domElement && container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
            }
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="achievements-3d-canvas"
            title="Interactive Competitive Trophy Monolith (Click to Pulse)"
            style={{
                position: 'absolute',
                top: '18%',
                right: '1%',
                width: '400px',
                height: '400px',
                pointerEvents: 'auto',
                zIndex: 1,
                overflow: 'visible'
            }}
        />
    );
};

export default Achievements3DCanvas;
