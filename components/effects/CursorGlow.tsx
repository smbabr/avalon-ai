"use client";
import { useEffect, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Optimized Custom Cursor with Glow Effect
 * Uses hardware acceleration and spring physics for maximum smoothness
 */
export default function CursorGlow() {
    const [isClicking, setIsClicking] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use Motion Values for high-performance updates outside of React render cycle
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring configuration for smooth but responsive movement
    const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Precise mobile detection
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
            setIsMobile(mobile);
        };

        checkMobile();

        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isMobile, isVisible, mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <>
            {/* Glow effect - Optimized with translate3d through framer-motion */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-screen will-change-transform"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 0.3 : 0,
                    scale: isClicking ? 0.8 : 1,
                }}
            >
                <div
                    className="w-[300px] h-[300px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                    }}
                />
            </motion.div>

            {/* Cursor dot */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[10000] w-2 h-2 rounded-full bg-avalon-accent border border-avalon-accent/50 will-change-transform"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                    scale: isClicking ? 0.6 : 1,
                }}
            />
        </>
    );
}
