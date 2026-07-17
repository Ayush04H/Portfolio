import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Contact3DCanvas — Global Cloud Matrix & Distributed API Endpoint Portal
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / zero ConcurrentRoot errors).
 * Directly visualizes AWS Cloud endpoints, REST APIs, and microservice communication.
 */
const Contact3DCanvas = () => {
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

        // 1. Geodesic Cloud Matrix Sphere
        const globeGeo = new THREE.IcosahedronGeometry(4.2, 2);
        const globeMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.75 });
        const globe = new THREE.Mesh(globeGeo, globeMat);
        group.add(globe);

        // 2. Orbital API Signal Rings (Cognito / Secrets Manager security rings)
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.12, 16, 64), new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.85 }));
        ring1.rotation.x = Math.PI / 3;
        group.add(ring1);

        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.8, 0.08, 16, 64), new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.8 }));
        ring2.rotation.y = Math.PI / 4;
        group.add(ring2);

        // 3. Inner Data Core
        const core = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: false, transparent: true, opacity: 0.3 }));
        group.add(core);

        // 4. API Endpoint Satellites (Communication Nodes)
        const sCount = 80;
        const sPos = new Float32Array(sCount * 3);
        for (let i = 0; i < sCount; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 6.2 + Math.random() * 1.5;
            sPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            sPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            sPos[i * 3 + 2] = r * Math.cos(phi);
        }
        const sGeo = new THREE.BufferGeometry();
        sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
        const satellites = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.24, transparent: true, opacity: 0.95 }));
        group.add(satellites);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        };

        const onClick = () => {
            // Signal surge
            gsap.to(group.rotation, { y: group.rotation.y + Math.PI, duration: 1.2, ease: 'power3.out' });
            gsap.to(ring1.scale, { x: 1.25, y: 1.25, z: 1.25, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' });
            gsap.to(ring2.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' });
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
            globe.rotation.y += 0.005;
            ring1.rotation.z += 0.008;
            ring2.rotation.x -= 0.006;
            satellites.rotation.y += 0.003;
            core.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.15);

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
            className="contact-3d-canvas"
            title="Interactive Global Cloud Matrix & API Portal (Click to Signal)"
            style={{
                position: 'absolute',
                top: '14%',
                right: '1%',
                width: '420px',
                height: '420px',
                pointerEvents: 'auto',
                zIndex: 1,
                overflow: 'visible'
            }}
        />
    );
};

export default Contact3DCanvas;
