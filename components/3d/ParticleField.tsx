"use client";
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    mouseX?: number;
    mouseY?: number;
}

/**
 * Optimized 3D Particle Field Component
 * Reduced particle count and simplified animations for 60fps performance
 */
export default function ParticleField({
    count: propCount,
    mouseX = 0,
    mouseY = 0
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Optimized particle counts: 800 desktop, 300 mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = propCount || (isMobile ? 300 : 800);

    // Generate particle positions - optimized distribution
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const radius = 8; // Smaller radius for better density

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const r = radius * Math.pow(Math.random(), 0.7);

            positions[i3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = r * Math.cos(phi) - 4;
        }

        return positions;
    }, [count]);

    // Optimized animation - reduced calculations
    let frameCount = 0;
    useFrame((state) => {
        if (!pointsRef.current) return;

        frameCount++;
        const time = state.clock.getElapsedTime();

        // Faster rotation for more visible movement
        pointsRef.current.rotation.y = time * 0.1;

        // Simplified mouse interaction
        const targetRotX = mouseY * 0.15;
        const targetRotY = mouseX * 0.15 + time * 0.1;

        pointsRef.current.rotation.x += (targetRotX - pointsRef.current.rotation.x) * 0.05;
        pointsRef.current.rotation.y += (targetRotY - pointsRef.current.rotation.y) * 0.05;

        // Wave motion - disabled on mobile, and only every 4th frame on desktop
        if (isMobile) return;
        if (frameCount % 4 !== 0) return;

        const positions = pointsRef.current.geometry.attributes.position;
        const array = positions.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const y = array[i3 + 1];
            array[i3 + 1] = y + Math.sin(time * 0.4 + i * 0.1) * 0.008;
        }

        positions.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#10B981"
                size={isMobile ? 0.04 : 0.025}
                sizeAttenuation={!isMobile} // Performance boost for mobile
                depthWrite={false}
                opacity={0.75}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}
