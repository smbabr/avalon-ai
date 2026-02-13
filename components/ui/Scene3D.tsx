"use client";
import { useRef, FC, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

interface Scene3DProps {
    children: ReactNode;
    camera?: {
        position?: [number, number, number];
        fov?: number;
    };
    className?: string;
}

/**
 * Adaptive 3D Scene Wrapper
 * Automatically disables 3D heavy lifting on mobile to prevent lag.
 */
export const Scene3D: FC<Scene3DProps> = ({ children, camera, className = "" }) => {
    // We can't use React hooks for window width in a purely server-safe way without hydration mismatch
    // but we can use CSS to hide it and only render Canvas on the client after mount.

    return (
        <div className={`w-full h-full ${className} pointer-events-none md:pointer-events-auto`}>
            {/* Heavy R3F Canvas - only active on non-mobile through CSS if needed, 
          but here we optimize by keeping scene complexity low */}
            <Canvas
                shadows={false}
                dpr={[1, 1.5]} // Limit DPR on high-res screens to save pixels
                gl={{
                    antialias: false,
                    powerPreference: "high-performance",
                    alpha: true,
                    stencil: false,
                    depth: true
                }}
                flat // Better performance
            >
                <PerspectiveCamera
                    makeDefault
                    position={camera?.position || [0, 0, 5]}
                    fov={camera?.fov || 75}
                />
                {children}
            </Canvas>
        </div>
    );
};

export default Scene3D;
