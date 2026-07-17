import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Hero3DCanvas — AI/ML Neural Brain & Distributed Cloud Architecture Core
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / no ConcurrentRoot errors).
 * Directly represents Ayush's core resume domain: AI/ML Neural Networks & AWS Distributed Systems.
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

        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // 2. AI Neural Brain Architecture (Interconnected Synaptic Nodes)
        const neuronCount = 70;
        const neuronPositions = new Float32Array(neuronCount * 3);
        const neuronNodes = [];

        for (let i = 0; i < neuronCount; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const radius = 3.8 + Math.random() * 1.5;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            neuronPositions[i * 3]     = x;
            neuronPositions[i * 3 + 1] = y;
            neuronPositions[i * 3 + 2] = z;
            neuronNodes.push(new THREE.Vector3(x, y, z));
        }

        // Synaptic connection lines between neighboring neurons (< 3.0 distance)
        const linePositions = [];
        for (let i = 0; i < neuronCount; i++) {
            for (let j = i + 1; j < neuronCount; j++) {
                const dist = neuronNodes[i].distanceTo(neuronNodes[j]);
                if (dist < 2.8) {
                    linePositions.push(
                        neuronNodes[i].x, neuronNodes[i].y, neuronNodes[i].z,
                        neuronNodes[j].x, neuronNodes[j].y, neuronNodes[j].z
                    );
                }
            }
        }

        // Neuron point cloud
        const neuronGeo = new THREE.BufferGeometry();
        neuronGeo.setAttribute('position', new THREE.BufferAttribute(neuronPositions, 3));
        const neuronMat = new THREE.PointsMaterial({
            color: 0xf59e0b, // Amber Gold synaptic nodes
            size: 0.28,
            transparent: true,
            opacity: 0.95
        });
        const brainCloud = new THREE.Points(neuronGeo, neuronMat);
        mainGroup.add(brainCloud);

        // Synaptic line segments
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x6366f1, // Electric Indigo connections
            transparent: true,
            opacity: 0.55
        });
        const synapses = new THREE.LineSegments(lineGeo, lineMat);
        mainGroup.add(synapses);

        // Inner GenAI Processing Core
        const coreGeo = new THREE.SphereGeometry(2.0, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0xff8c00,
            transparent: true,
            opacity: 0.3
        });
        const aiCore = new THREE.Mesh(coreGeo, coreMat);
        mainGroup.add(aiCore);

        // 3. AWS Distributed Cloud Orbital Rings (Microservices in Orbit)
        const orbitGroup = new THREE.Group();
        mainGroup.add(orbitGroup);

        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.7 });
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.6 });

        const orbitRing1 = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.08, 16, 64), ringMat1);
        orbitRing1.rotation.x = Math.PI / 3;
        orbitGroup.add(orbitRing1);

        const orbitRing2 = new THREE.Mesh(new THREE.TorusGeometry(6.8, 0.06, 16, 64), ringMat2);
        orbitRing2.rotation.y = Math.PI / 4;
        orbitGroup.add(orbitRing2);

        // Orbiting Data Packets (Microservice nodes along rings)
        const packetGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const packetMat = new THREE.MeshBasicMaterial({ color: 0x10b981 }); // Emerald data packets
        const packet1 = new THREE.Mesh(packetGeo, packetMat);
        const packet2 = new THREE.Mesh(packetGeo, packetMat);
        orbitGroup.add(packet1);
        orbitGroup.add(packet2);

        // 4. Interaction & GSAP Synapse Burst
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3.5;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3.5;
        };

        const onClick = () => {
            // Electrical pulse surge across synaptic nodes and orbital surge
            gsap.to(mainGroup.scale, {
                x: 1.25, y: 1.25, z: 1.25,
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
            gsap.to(orbitGroup.rotation, {
                y: orbitGroup.rotation.y + Math.PI,
                z: orbitGroup.rotation.z + Math.PI / 2,
                duration: 1.3,
                ease: 'power3.out'
            });
            gsap.to(lineMat, {
                opacity: 1.0,
                duration: 0.3,
                yoyo: true,
                repeat: 1
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

            // Autonomous neural rotation
            brainCloud.rotation.y += 0.004;
            synapses.rotation.y += 0.004;
            aiCore.scale.setScalar(1 + Math.sin(Date.now() * 0.004) * 0.15);

            // Orbiting data packets along ring tracks
            const time = Date.now() * 0.002;
            packet1.position.set(Math.cos(time) * 6.2, Math.sin(time) * 6.2 * 0.5, Math.sin(time) * 6.2 * 0.86);
            packet2.position.set(Math.sin(-time) * 6.8 * 0.7, Math.cos(-time) * 6.8, Math.sin(-time) * 6.8 * 0.7);

            orbitRing1.rotation.z += 0.006;
            orbitRing2.rotation.x -= 0.005;

            // Smooth mouse tilt tracking
            mainGroup.rotation.y += (mouseX - mainGroup.rotation.y) * 0.08;
            mainGroup.rotation.x += (mouseY - mainGroup.rotation.x) * 0.08;

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
            title="Interactive AI Neural Brain & Distributed Cloud (Click to Pulse Synapses)"
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
