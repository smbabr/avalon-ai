"use client";
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingGeometryProps {
    position?: [number, number, number];
    type?: 'dodecahedron' | 'octahedron' | 'torusKnot' | 'icosahedron';
    scale?: number;
    rotationSpeed?: number;
}

/**
 * Floating Geometric Shape Component
 * Renders wireframe geometry with gentle rotation and floating motion
 */
export default function FloatingGeometry({
    position = [0, 0, 0],
    type = 'dodecahedron',
    scale = 1,
    rotationSpeed = 0.3,
}: FloatingGeometryProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const startY = position[1];

    // Select geometry based on type
    const geometry = (() => {
        switch (type) {
            case 'dodecahedron':
                return <dodecahedronGeometry args={[1, 0]} />;
            case 'octahedron':
                return <octahedronGeometry args={[1, 0]} />;
            case 'torusKnot':
                return <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />;
            case 'icosahedron':
                return <icosahedronGeometry args={[1, 0]} />;
            default:
                return <dodecahedronGeometry args={[1, 0]} />;
        }
    })();

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Gentle rotation
        meshRef.current.rotation.x = time * rotationSpeed * 0.2;
        meshRef.current.rotation.y = time * rotationSpeed * 0.3;
        meshRef.current.rotation.z = time * rotationSpeed * 0.1;

        // Floating motion (subtle up/down)
        meshRef.current.position.y = startY + Math.sin(time * 0.5) * 0.3;

        // Subtle scale pulsing
        const pulseScale = 1 + Math.sin(time * 0.7) * 0.05;
        meshRef.current.scale.set(scale * pulseScale, scale * pulseScale, scale * pulseScale);
    });

    return (
        <mesh ref={meshRef} position={position}>
            {geometry}
            <meshBasicMaterial
                color="#10B981"
                wireframe
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}
