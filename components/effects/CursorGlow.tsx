"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Extreme Performance Custom Cursor
 * Bypasses React render cycle entirely for position updates via raw DOM + translate3d
 * Optimized for low-latency on laptop-class hardware
 */
export default function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
            setIsMobile(mobile);
        };

        checkMobile();
        if (isMobile) return;

        // Position state (outside of React)
        const pos = { x: -100, y: -100 };
        const glow = { x: -100, y: -100 };
        const dot = { x: -100, y: -100 };
        let isClicking = false;
        let isVisible = false;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) {
                isVisible = true;
                if (glowRef.current) glowRef.current.style.opacity = '0.3';
                if (dotRef.current) dotRef.current.style.opacity = '1';
            }
            pos.x = e.clientX;
            pos.y = e.clientY;
        };

        const handleMouseDown = () => { isClicking = true; };
        const handleMouseUp = () => { isClicking = false; };
        const handleMouseLeave = () => {
            isVisible = false;
            if (glowRef.current) glowRef.current.style.opacity = '0';
            if (dotRef.current) dotRef.current.style.opacity = '0';
        };

        const update = () => {
            // High-performance interpolation
            // Glow: Smooth, slow follow
            glow.x += (pos.x - glow.x) * 0.12;
            glow.y += (pos.y - glow.y) * 0.12;

            // Dot: Crisp, fast follow
            dot.x += (pos.x - dot.x) * 0.35;
            dot.y += (pos.y - dot.y) * 0.35;

            const scaleGlow = isClicking ? 0.8 : 1;
            const scaleDot = isClicking ? 0.6 : 1;

            if (glowRef.current) {
                glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%) scale(${scaleGlow})`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${scaleDot})`;
            }

            requestAnimationFrame(update);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        const rafId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Glow effect - Raw DOM for zero-latency */}
            <div
                ref={glowRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-screen will-change-transform opacity-0 pointer-events-none"
                style={{
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 70%)',
                    transition: 'opacity 0.3s ease-out',
                }}
            />

            {/* Cursor dot - High-precision follow */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[10000] w-1.5 h-1.5 rounded-full bg-avalon-accent opacity-0 border border-avalon-accent/50 will-change-transform pointer-events-none"
                style={{
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
                    transition: 'opacity 0.2s ease-out',
                }}
            />
        </>
    );
}
