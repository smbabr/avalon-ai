"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Custom Cursor with Glow Effect
 * Following cursor dot with animated radial gradient glow
 */
export default function CursorGlow() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };

        checkMobile();

        // We can't really "return" early for hooks, but we can prevent listeners
        if (isMobile) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Glow effect */}
            <motion.div
                className="pointer-events-none fixed z-[9999] mix-blend-screen"
                animate={{
                    x: mousePosition.x - 100,
                    y: mousePosition.y - 100,
                    scale: isClicking ? 0.8 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div
                    className="w-[200px] h-[200px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                    }}
                />
            </motion.div>

            {/* Cursor dot */}
            <motion.div
                className="pointer-events-none fixed z-[10000] w-2 h-2 rounded-full bg-avalon-accent border border-avalon-accent/50"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isClicking ? 0.6 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 30,
                }}
            />
        </>
    );
}
