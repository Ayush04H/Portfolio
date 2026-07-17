import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Floating particle field — amber + indigo palette
 * Contained absolutely inside .hero (position:relative)
 * Alpha canvas — no background bleed
 */
const Particles = ({ count = 350 }) => {
    const ref = useRef();

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const palette = [
            new THREE.Color('#f59e0b'),  // amber
            new THREE.Color('#6366f1'),  // indigo
            new THREE.Color('#8b5cf6'),  // violet
            new THREE.Color('#d97706'),  // amber dim
        ];

        for (let i = 0; i < count; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 18;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3]     = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return [pos, col];
    }, [count]);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.04;
            ref.current.rotation.x += delta * 0.015;

            // Gentle mouse parallax
            const { x, y } = state.pointer;
            ref.current.position.x += (x * 0.3 - ref.current.position.x) * 0.04;
            ref.current.position.y += (-y * 0.3 - ref.current.position.y) * 0.04;
        }
    });

    return (
        <Points ref={ref} positions={positions} colors={colors} stride={3}>
            <PointMaterial
                transparent
                vertexColors
                size={0.055}
                sizeAttenuation
                depthWrite={false}
                opacity={0.75}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
};

const HeroParticles = () => (
    <div className="hero-canvas-wrap" aria-hidden="true">
        <Canvas
            camera={{ position: [0, 0, 6], fov: 65 }}
            dpr={[1, 1.5]}          /* cap at 1.5x for perf */
            gl={{
                antialias: false,    /* disabled — invisible at small point sizes */
                alpha: true,         /* transparent background — NO teal bleed */
                powerPreference: 'high-performance',
                stencil: false,
                depth: false,
            }}
            style={{ pointerEvents: 'none' }}
        >
            <Particles count={350} />
        </Canvas>
    </div>
);

export default HeroParticles;
