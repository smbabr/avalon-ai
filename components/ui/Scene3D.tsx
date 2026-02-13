"use client";
import { Canvas } from '@react-three/fiber';
import { ReactNode, Suspense } from 'react';
import { detectDeviceCapabilities } from '@/lib/DeviceCapabilities';

interface Scene3DProps {
    children: ReactNode;
    className?: string;
    camera?: {
        position?: [number, number, number];
        fov?: number;
    };
}

/**
 * Base 3D Canvas wrapper component
 * Provides optimal settings and performance monitoring
 */
export default function Scene3D({ children, className = '', camera }: Scene3DProps) {
    const capabilities = detectDeviceCapabilities();

    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                camera={{
                    position: camera?.position || [0, 0, 5],
                    fov: camera?.fov || 75,
                }}
                dpr={capabilities.pixelRatio}
                gl={{
                    antialias: capabilities.quality !== 'low',
                    alpha: true,
                    powerPreference: capabilities.isMobile ? 'low-power' : 'high-performance',
                }}
                shadows={capabilities.shadowsEnabled}
                frameloop="always"
            >
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
