import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Experience3DCanvas — Dedicated 3D Tech Orbit & Cyber Nodes for Work Experience section.
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / zero ConcurrentRoot errors).
 */
const Experience3DCanvas = () => {
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
        const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.85 });
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.8 });
        const coreMat  = new THREE.MeshBasicMaterial({ color: 0xffb703, wireframe: false, transparent: true, opacity: 0.3 });

        const group = new THREE.Group();
        scene.add(group);

        // Interlocking Torus Rings
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.7, 16, 64), ring1Mat);
        ring1.rotation.x = Math.PI / 3;
        group.add(ring1);

        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.5, 16, 64), ring2Mat);
        ring2.rotation.y = Math.PI / 3;
        group.add(ring2);

        // Inner Octahedron Core
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(2.5, 1), coreMat);
        group.add(core);

        // Orbiting particles
        const pCount = 120;
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount; i++) {
            pPos[i * 3]     = (Math.random() - 0.5) * 16;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.18, transparent: true, opacity: 0.85 }));
        group.add(particles);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        };

        const onClick = () => {
            gsap.to(group.rotation, { y: group.rotation.y + Math.PI, duration: 1.2, ease: 'power3.out' });
            gsap.to(core.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' });
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
            ring1.rotation.z += 0.007;
            ring2.rotation.x += 0.006;
            core.rotation.y -= 0.01;
            particles.rotation.y += 0.004;

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
            className="experience-3d-canvas"
            title="Interactive 3D Tech Orbit (Click or Move Mouse)"
            style={{
                position: 'absolute',
                top: '12%',
                right: '2%',
                width: '420px',
                height: '420px',
                pointerEvents: 'auto',
                zIndex: 1,
                overflow: 'visible'
            }}
        />
    );
};

export default Experience3DCanvas;
