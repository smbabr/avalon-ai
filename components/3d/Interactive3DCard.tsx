"use client";
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface Interactive3DCardProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

/**
 * Interactive 3D Card Component
 * Creates a card that tilts in 3D space based on mouse position
 */
export default function Interactive3DCard({
    children,
    className = '',
    intensity = 15,
}: Interactive3DCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

    // Motion values for smooth interpolation
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Spring physics for smooth movement
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), {
        stiffness: 150,
        damping: 15,
    });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), {
        stiffness: 150,
        damping: 15,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        mouseX.set(x);
        mouseY.set(y);
        setShinePos({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
        setShinePos({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
            className={className}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="relative"
            >
                {/* Content layer */}
                <div style={{ transform: 'translateZ(20px)' }}>
                    {children}
                </div>

                {/* Shine effect overlay */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-sm"
                        style={{
                            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </motion.div>
        </div>
    );
}
