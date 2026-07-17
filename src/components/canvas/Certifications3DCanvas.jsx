import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Certifications3DCanvas — Dedicated Interactive Cryptographic Verification Shield & Neural Badge
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / zero ConcurrentRoot errors).
 * Directly visualizes AWS Cloud Practitioner, Deep Learning Specialization, & MLOps Bootcamp verification.
 */
const Certifications3DCanvas = () => {
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

        // 1. AWS Cryptographic Verification Hex Shield (Outer Ring)
        const hexRingGeo = new THREE.TorusGeometry(4.6, 0.6, 6, 64); // Hexagonal cross-section/shape
        const hexRingMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.9 });
        const hexShield = new THREE.Mesh(hexRingGeo, hexRingMat);
        hexShield.rotation.x = Math.PI / 4;
        group.add(hexShield);

        // 2. MLOps / Deep Learning Tensor Lattice (Middle Octahedron Frame)
        const tensorGeo = new THREE.OctahedronGeometry(3.2, 1);
        const tensorMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.8 });
        const tensorMesh = new THREE.Mesh(tensorGeo, tensorMat);
        group.add(tensorMesh);

        // 3. Inner Verified Core Sphere (Electric Indigo Core)
        const coreGeo = new THREE.SphereGeometry(1.8, 24, 24);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: false, transparent: true, opacity: 0.35 });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        group.add(coreMesh);

        // 4. Orbiting Credential Verification Sparks (90 glowing data points)
        const pCount = 90;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 5.2 + Math.random() * 2.0;
            pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pPos[i * 3 + 2] = r * Math.cos(phi);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const verificationSparks = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x10b981, size: 0.22, transparent: true, opacity: 0.9 }));
        group.add(verificationSparks);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        };

        const onClick = () => {
            // Cryptographic verification surge across shield and core
            gsap.to(group.rotation, { y: group.rotation.y + Math.PI * 1.5, duration: 1.1, ease: 'power3.out' });
            gsap.to(hexShield.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' });
            gsap.to(coreMesh.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' });
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
            hexShield.rotation.y += 0.007;
            hexShield.rotation.z += 0.005;
            tensorMesh.rotation.x -= 0.008;
            tensorMesh.rotation.y += 0.006;
            verificationSparks.rotation.y += 0.004;
            coreMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.004) * 0.12);

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
            className="certifications-3d-canvas"
            title="Interactive AWS & MLOps Cryptographic Verification Shield (Click to Verify)"
            style={{
                position: 'absolute',
                top: '20%',
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

export default Certifications3DCanvas;
