import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Hero3DCanvas — High-Impact Interactive 3D Cyber Sculpture right inside Hero
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / no ConcurrentRoot errors).
 * Features a glowing multi-layered Cyber Ring & Icosahedron Core that reacts to mouse tracking.
 */
const Hero3DCanvas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // 1. Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 18;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 2. Glowing Materials
        const outerTorusMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b, // Amber Gold
            wireframe: true,
            transparent: true,
            opacity: 0.85
        });

        const middleIcoMat = new THREE.MeshBasicMaterial({
            color: 0x6366f1, // Electric Indigo
            wireframe: true,
            transparent: true,
            opacity: 0.75
        });

        const innerSphereMat = new THREE.MeshBasicMaterial({
            color: 0xff8c00, // Deep Gold/Orange glow
            wireframe: false,
            transparent: true,
            opacity: 0.25
        });

        const particleMat = new THREE.PointsMaterial({
            color: 0xf59e0b,
            size: 0.18,
            transparent: true,
            opacity: 0.9
        });

        // 3. Geometries & Meshes
        // Group holds all interactive elements
        const cyberGroup = new THREE.Group();
        scene.add(cyberGroup);

        // Outer Torus Ring
        const torusGeo = new THREE.TorusGeometry(6, 1.2, 24, 64);
        const torusMesh = new THREE.Mesh(torusGeo, outerTorusMat);
        torusMesh.rotation.x = Math.PI / 4;
        cyberGroup.add(torusMesh);

        // Middle Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(4, 1);
        const icoMesh = new THREE.Mesh(icoGeo, middleIcoMat);
        cyberGroup.add(icoMesh);

        // Inner Glowing Core Orb
        const orbGeo = new THREE.SphereGeometry(2.2, 32, 32);
        const orbMesh = new THREE.Mesh(orbGeo, innerSphereMat);
        cyberGroup.add(orbMesh);

        // Orbiting Particle Cloud (200 glowing dots around sphere)
        const pCount = 200;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 5.5 + Math.random() * 2.5;
            pPos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
            pPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pPos[i * 3 + 2] = radius * Math.cos(phi);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particles = new THREE.Points(pGeo, particleMat);
        cyberGroup.add(particles);

        // Position slightly off-center for balanced hero composition
        cyberGroup.position.set(0, 0, 0);

        // 4. Mouse interaction & GSAP animations
        let mouseX = 0;
        let mouseY = 0;
        let targetSpeedX = 0.006;
        let targetSpeedY = 0.008;

        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3.5;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3.5;
        };

        const onClick = () => {
            // GSAP pulse burst when clicked/interacted
            gsap.to(cyberGroup.scale, {
                x: 1.25, y: 1.25, z: 1.25,
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
            gsap.to(torusMesh.rotation, {
                y: torusMesh.rotation.y + Math.PI,
                duration: 1.2,
                ease: 'power3.out'
            });
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

        // 5. Render loop
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            // Autonomous 3D rotation
            torusMesh.rotation.x += 0.005;
            torusMesh.rotation.y += targetSpeedX;
            icoMesh.rotation.y -= 0.007;
            icoMesh.rotation.z += 0.004;
            particles.rotation.y += 0.003;
            orbMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.12);

            // Smooth mouse tilt tracking
            cyberGroup.rotation.y += (mouseX - cyberGroup.rotation.y) * 0.08;
            cyberGroup.rotation.x += (mouseY - cyberGroup.rotation.x) * 0.08;

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
            className="hero-3d-canvas"
            title="Interactive 3D Cyber Geometry (Click or Move Mouse)"
            style={{
                position: 'absolute',
                top: '50%',
                right: '-5%',
                transform: 'translateY(-50%)',
                width: '620px',
                height: '620px',
                pointerEvents: 'auto',
                zIndex: 1,
                overflow: 'visible'
            }}
        />
    );
};

export default Hero3DCanvas;
