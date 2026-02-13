"use client";
import { useEffect, useState, useRef } from 'react';

interface Mouse3DPosition {
    x: number;
    y: number;
    normalizedX: number; // -1 to 1
    normalizedY: number; // -1 to 1
    rotationX: number;   // Rotation in radians
    rotationY: number;   // Rotation in radians
}

interface Use3DMouseTrackingOptions {
    intensity?: number;      // Multiplier for tracking intensity (default: 1)
    smoothing?: number;      // Lerp factor for smooth interpolation (0-1, default: 0.1)
    maxRotation?: number;    // Maximum rotation in radians (default: 0.3)
    enabled?: boolean;       // Enable/disable tracking (default: true)
}

/**
 * Hook for tracking mouse position and converting to 3D coordinates
 * Returns normalized coordinates and rotation values for 3D transformations
 */
export function use3DMouseTracking(options: Use3DMouseTrackingOptions = {}): Mouse3DPosition {
    const {
        intensity = 1,
        smoothing = 0.1,
        maxRotation = 0.3,
        enabled = true,
    } = options;

    const [mousePos, setMousePos] = useState<Mouse3DPosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
        rotationX: 0,
        rotationY: 0,
    });

    const targetPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1 range
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;

            targetPos.current = {
                x: normalizedX,
                y: normalizedY,
            };
        };

        // Smooth interpolation loop
        const animate = () => {
            // Lerp (linear interpolation) for smooth movement
            currentPos.current.x += (targetPos.current.x - currentPos.current.x) * smoothing;
            currentPos.current.y += (targetPos.current.y - currentPos.current.y) * smoothing;

            const x = currentPos.current.x;
            const y = currentPos.current.y;

            // Calculate rotation based on position and intensity
            const rotationX = y * maxRotation * intensity;
            const rotationY = x * maxRotation * intensity;

            setMousePos({
                x: (x + 1) / 2, // Convert back to 0-1 for direct use
                y: (y + 1) / 2,
                normalizedX: x,
                normalizedY: y,
                rotationX,
                rotationY,
            });

            rafId.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [enabled, intensity, smoothing, maxRotation]);

    return mousePos;
}
