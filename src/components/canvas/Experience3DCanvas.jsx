import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Experience3DCanvas — Distributed Routing Engine & GenAI Data Pipeline Matrix
 * Pure Vanilla Three.js + GSAP (Zero @react-three/fiber dependencies / zero ConcurrentRoot errors).
 * Directly visualizes Street Surge (2M+ node routing algorithms) & CereLabs (Vector Similarity Search / GenAI).
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

        const group = new THREE.Group();
        scene.add(group);

        // 1. Central Routing Hub (PostgreSQL / AWS Core)
        const hubGeo = new THREE.IcosahedronGeometry(1.6, 1);
        const hubMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.9 });
        const centralHub = new THREE.Mesh(hubGeo, hubMat);
        group.add(centralHub);

        // 2. Company Node Clusters (Street Surge, CereLabs, OziBook)
        const nodePositions = [
            new THREE.Vector3(-4.5, 3.2, 1.5),  // Street Surge Node
            new THREE.Vector3(4.8, -1.5, -2.0), // CereLabs Node
            new THREE.Vector3(-2.0, -4.2, 2.5), // OziBook Node
            new THREE.Vector3(3.5, 3.8, -1.0),  // AWS EC2 Cluster
            new THREE.Vector3(-4.0, -2.0, -3.0) // GenAI Vector Store
        ];

        const nodeGeo = new THREE.SphereGeometry(0.55, 16, 16);
        const nodeColors = [0xf59e0b, 0x6366f1, 0x8b5cf6, 0x10b981, 0x06b6d4];
        const nodes = [];

        for (let i = 0; i < nodePositions.length; i++) {
            const mat = new THREE.MeshBasicMaterial({ color: nodeColors[i], wireframe: false, transparent: true, opacity: 0.85 });
            const mesh = new THREE.Mesh(nodeGeo, mat);
            mesh.position.copy(nodePositions[i]);
            group.add(mesh);
            nodes.push(mesh);
        }

        // 3. Routing Graph Lines connecting Central Hub to all nodes and cross-connecting nodes
        const lineCoords = [];
        for (let i = 0; i < nodePositions.length; i++) {
            lineCoords.push(0, 0, 0, nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
            const nextIdx = (i + 1) % nodePositions.length;
            lineCoords.push(
                nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
                nodePositions[nextIdx].x, nodePositions[nextIdx].y, nodePositions[nextIdx].z
            );
        }

        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineCoords), 3));
        const lineMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.5 });
        const routingGrid = new THREE.LineSegments(lineGeo, lineMat);
        group.add(routingGrid);

        // 4. Traveling Data Packets along Routing Paths
        const packetCount = 6;
        const packets = [];
        const packetGeo = new THREE.SphereGeometry(0.2, 12, 12);
        const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

        for (let i = 0; i < packetCount; i++) {
            const pMesh = new THREE.Mesh(packetGeo, packetMat);
            group.add(pMesh);
            packets.push({
                mesh: pMesh,
                targetIndex: i % nodePositions.length,
                progress: Math.random()
            });
        }

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 3;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
        };

        const onClick = () => {
            // Accelerate routing pulses and spin central hub
            gsap.to(group.rotation, { y: group.rotation.y + Math.PI, duration: 1.1, ease: 'power3.out' });
            gsap.to(centralHub.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' });
            gsap.to(lineMat, { opacity: 1.0, duration: 0.25, yoyo: true, repeat: 1 });
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
            centralHub.rotation.y += 0.012;
            centralHub.rotation.z += 0.008;
            routingGrid.rotation.y += 0.003;

            // Animate data packets traveling between central hub (0,0,0) and target nodes
            for (let i = 0; i < packets.length; i++) {
                const p = packets[i];
                p.progress += 0.015;
                if (p.progress >= 1) {
                    p.progress = 0;
                    p.targetIndex = (p.targetIndex + 1) % nodePositions.length;
                }
                const target = nodePositions[p.targetIndex];
                p.mesh.position.lerpVectors(new THREE.Vector3(0, 0, 0), target, p.progress);
            }

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
            title="Interactive Distributed Routing Engine & GenAI Pipeline (Click to Optimize)"
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
