import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * ThreeMotionBackground — Domain-Specific Engineering Lattices across ALL sections.
 * Vanilla Three.js + GSAP (Zero fiber dependencies, zero ConcurrentRoot crashes).
 * Positioned at zIndex: 1 so it floats visibly ABOVE solid section backgrounds and BEHIND section cards (zIndex: 2).
 * Replaces generic primitives with 6 Engineering Stack Sculptures tailored to Ayush's resume.
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

        // 2. Glowing Materials
        const amberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.65 });
        const indigoMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.6 });
        const violetMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.55 });
        const emeraldMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.5 });
        const cyanMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.6 });

        const meshes = [];

        // ── Mesh 1: Microservice Stack Cube (About/Hero border — Y: 5) ──
        // Represents Full-Stack Architecture (Spring Boot, React, Django layers)
        const stackGroup = new THREE.Group();
        const layer1 = new THREE.Mesh(new THREE.BoxGeometry(6, 1.2, 6), amberMat);
        const layer2 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.2, 4.8), indigoMat);
        const layer3 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.2, 3.6), violetMat);
        layer1.position.y = -2;
        layer2.position.y = 0;
        layer3.position.y = 2;
        stackGroup.add(layer1, layer2, layer3);
        stackGroup.position.set(-16, 5, -8);
        scene.add(stackGroup);
        meshes.push({ mesh: stackGroup, rx: 0.005, ry: 0.008 });

        // ── Mesh 2: AI/ML Neural Core (Skills section — Y: -25) ──
        // Represents GenAI, GPT-4, and OLLAMA framework systems
        const neuralGroup = new THREE.Group();
        const outerSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(6, 2), indigoMat);
        const innerSphere = new THREE.Mesh(new THREE.OctahedronGeometry(3.5, 1), cyanMat);
        neuralGroup.add(outerSphere, innerSphere);
        neuralGroup.position.set(18, -25, -12);
        scene.add(neuralGroup);
        meshes.push({ mesh: neuralGroup, rx: -0.006, ry: 0.007 });

        // ── Mesh 3: Distributed Graph Routing Cluster (Education/Experience border — Y: -55) ──
        // Represents Street Surge routing algorithms processing 2M+ nodes
        const graphGroup = new THREE.Group();
        const hubMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(5.5, 1), violetMat);
        const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(7.5, 0.4, 16, 48), amberMat);
        orbitRing.rotation.x = Math.PI / 3;
        graphGroup.add(hubMesh, orbitRing);
        graphGroup.position.set(-17, -55, -10);
        scene.add(graphGroup);
        meshes.push({ mesh: graphGroup, rx: 0.007, ry: -0.005 });

        // ── Mesh 4: AWS Cloud Server Infrastructure Ring (Projects area — Y: -85) ──
        // Represents EC2, RDS, Cognito, and Secrets Manager architecture
        const cloudGroup = new THREE.Group();
        const serverDisc1 = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 6.5, 1.0, 32, 1, true), amberMat);
        const serverDisc2 = new THREE.Mesh(new THREE.CylinderGeometry(5.0, 5.0, 1.0, 32, 1, true), indigoMat);
        const serverDisc3 = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 1.0, 32, 1, true), emeraldMat);
        serverDisc1.position.y = -2;
        serverDisc2.position.y = 0;
        serverDisc3.position.y = 2;
        cloudGroup.add(serverDisc1, serverDisc2, serverDisc3);
        cloudGroup.position.set(17, -85, -14);
        scene.add(cloudGroup);
        meshes.push({ mesh: cloudGroup, rx: -0.005, ry: -0.006 });

        // ── Mesh 5: Vector Space Embedding Tensor Cube (Achievements area — Y: -115) ──
        // Represents Vector similarity search across 50K+ documents
        const tensorGroup = new THREE.Group();
        const outerBox = new THREE.Mesh(new THREE.BoxGeometry(6.5, 6.5, 6.5), emeraldMat);
        const innerOct = new THREE.Mesh(new THREE.OctahedronGeometry(4.0, 0), amberMat);
        tensorGroup.add(outerBox, innerOct);
        tensorGroup.position.set(-16, -115, -12);
        scene.add(tensorGroup);
        meshes.push({ mesh: tensorGroup, rx: 0.008, ry: 0.004 });

        // ── Mesh 6: Cybernetic API Geodesic Globe (Contact/Footer area — Y: -145) ──
        // Represents distributed REST APIs and microservice communication
        const globeGroup = new THREE.Group();
        const geoSphere = new THREE.Mesh(new THREE.SphereGeometry(5.5, 16, 16), indigoMat);
        const signalTorus = new THREE.Mesh(new THREE.TorusGeometry(7.0, 0.3, 16, 64), cyanMat);
        signalTorus.rotation.y = Math.PI / 4;
        globeGroup.add(geoSphere, signalTorus);
        globeGroup.position.set(16, -145, -10);
        scene.add(globeGroup);
        meshes.push({ mesh: globeGroup, rx: 0.006, ry: 0.006 });

        // 3. Floating 3D Starfield & Data Node Lattices across entire scroll depth (-160 to 20)
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

        // 4. Interaction & GSAP Scrollytelling hooks
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 8;
            mouseY = (e.clientY / window.innerHeight - 0.5) * -8;
        };

        const onScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // Map scroll pixel offset to Three.js world Y coordinate (camera descends with page scroll)
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

        // 5. Render loop
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            // Rotate all 6 domain sculptures autonomously
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
                zIndex: 1,
                overflow: 'hidden'
            }}
        />
    );
};

export default ThreeMotionBackground;
