"use client";
import { ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    intensity?: number;
}

/**
 * Magnetic Button Component
 * Button that moves toward cursor with spring physics
 */
export default function MagneticButton({
    children,
    className = '',
    intensity = 0.3,
}: MagneticButtonProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        setPosition({
            x: distanceX * intensity,
            y: distanceY * intensity,
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
            className={className}
        >
            {children}
        </motion.button>
    );
}
