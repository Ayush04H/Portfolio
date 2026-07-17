import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Achievements3DCanvas — Dedicated Interactive 3D Trophy / Medal Cage for Achievements & Certifications section.
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / zero ConcurrentRoot errors).
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

        // Materials
        const goldMat    = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.85 });
        const emeraldMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.75 });
        const coreMat    = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: false, transparent: true, opacity: 0.25 });

        const group = new THREE.Group();
        scene.add(group);

        // Trophy / Medal Outer Ring
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.8, 16, 64), goldMat);
        ring1.rotation.x = Math.PI / 4;
        group.add(ring1);

        // Middle Emerald Octahedron Frame
        const frame = new THREE.Mesh(new THREE.OctahedronGeometry(3.6, 1), emeraldMat);
        group.add(frame);

        // Inner Glowing Core Orb
        const orb = new THREE.Mesh(new THREE.SphereGeometry(2.0, 32, 32), coreMat);
        group.add(orb);

        // Orbiting particles (Trophy Sparks)
        const pCount = 100;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 5 + Math.random() * 2;
            pPos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
            pPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pPos[i * 3 + 2] = radius * Math.cos(phi);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.2, transparent: true, opacity: 0.9 }));
        group.add(particles);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        };

        const onClick = () => {
            gsap.to(group.rotation, { y: group.rotation.y + Math.PI, duration: 1.1, ease: 'power3.out' });
            gsap.to(group.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' });
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
            ring1.rotation.y += 0.006;
            ring1.rotation.z += 0.004;
            frame.rotation.x -= 0.007;
            frame.rotation.y += 0.005;
            particles.rotation.y += 0.003;
            orb.scale.setScalar(1 + Math.sin(Date.now() * 0.004) * 0.1);

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
            title="Interactive 3D Trophy Sculpture (Click or Move Mouse)"
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
