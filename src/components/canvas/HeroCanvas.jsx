import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './HeroCanvas.css';

// Interactive Cyber Particle Field
const ParticleField = ({ count = 600 }) => {
    const pointsRef = useRef();

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const colorPalette = [
            new THREE.Color('#00f2fe'), // Cyan
            new THREE.Color('#4facfe'), // Azure
            new THREE.Color('#a855f7'), // Purple
            new THREE.Color('#38bdf8'), // Light blue
        ];

        for (let i = 0; i < count; i++) {
            // Spread across 3D space
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

            const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            col[i * 3] = chosenColor.r;
            col[i * 3 + 1] = chosenColor.g;
            col[i * 3 + 2] = chosenColor.b;
        }
        return [pos, col];
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
            pointsRef.current.rotation.x += delta * 0.02;

            // Gentle mouse follow parallax
            const { x, y } = state.pointer;
            pointsRef.current.position.x += (x * 0.5 - pointsRef.current.position.x) * 0.05;
            pointsRef.current.position.y += (-y * 0.5 - pointsRef.current.position.y) * 0.05;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
            <PointMaterial
                transparent
                vertexColors
                size={0.06}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

// Interactive Distorted Cyber Core
const CyberCore = () => {
    const coreRef = useRef();
    const wireframeRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (coreRef.current) {
            coreRef.current.rotation.y = time * 0.2;
            coreRef.current.rotation.z = Math.sin(time * 0.3) * 0.2;

            // Smooth mouse responsiveness
            const targetX = state.pointer.x * 0.8;
            const targetY = -state.pointer.y * 0.8;
            coreRef.current.position.x += (targetX - coreRef.current.position.x) * 0.05;
            coreRef.current.position.y += (targetY - coreRef.current.position.y) * 0.05;
        }
        if (wireframeRef.current) {
            wireframeRef.current.rotation.y = -time * 0.15;
            wireframeRef.current.rotation.x = time * 0.1;
        }
    });

    return (
        <group>
            {/* Distorted glowing core */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={coreRef} scale={[1.4, 1.4, 1.4]}>
                    <icosahedronGeometry args={[1.2, 16]} />
                    <MeshDistortMaterial
                        color="#0b1329"
                        emissive="#00f2fe"
                        emissiveIntensity={0.4}
                        roughness={0.1}
                        metalness={0.9}
                        distort={0.35}
                        speed={2.5}
                        wireframe={false}
                    />
                </mesh>
            </Float>

            {/* Surrounding Wireframe Torus Cage */}
            <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
                <mesh ref={wireframeRef} scale={[2.1, 2.1, 2.1]}>
                    <torusKnotGeometry args={[1, 0.2, 64, 8, 2, 3]} />
                    <meshStandardMaterial
                        color="#a855f7"
                        emissive="#a855f7"
                        emissiveIntensity={0.5}
                        wireframe={true}
                        transparent
                        opacity={0.35}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const HeroCanvas = () => {
    return (
        <div className="hero-canvas-container">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f2fe" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
                <pointLight position={[0, 0, 2]} intensity={2} color="#4facfe" distance={5} />

                <ParticleField count={700} />
                <CyberCore />
            </Canvas>
        </div>
    );
};

export default HeroCanvas;
