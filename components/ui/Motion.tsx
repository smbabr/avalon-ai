"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

type AvalonMotionProps = MotionProps & {
    className?: string;
    children?: ReactNode;
    delay?: number;
};

const EASE_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
// const EASE_MATERIAL: [number, number, number, number] = [0.4, 0, 0.2, 1]; // Reserved for micro-interactions

export const FadeIn = ({ children, className, delay = 0 }: AvalonMotionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.9,
            ease: EASE_EXPO,
            delay: delay,
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SectionEntry = ({ children, className, delay = 0 }: AvalonMotionProps) => (
    <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
            duration: 0.7,
            ease: EASE_EXPO,
            delay: delay,
        }}
        className={className}
    >
        {children}
    </motion.section>
);

/**
 * 3D-aware fade in with depth
 * Slides forward from background along Z-axis
 */
export const FadeIn3D = ({ children, className, delay = 0 }: AvalonMotionProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 1,
            ease: EASE_EXPO,
            delay: delay,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * 3D rotation entry animation
 * Rotates into view in 3D space
 */
export const RotateIn3D = ({ children, className, delay = 0 }: AvalonMotionProps) => (
    <motion.div
        initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
        whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
            duration: 0.9,
            ease: EASE_EXPO,
            delay: delay,
        }}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * Perspective scale animation
 * Scales with 3D perspective transform
 */
export const PerspectiveScale = ({ children, className, delay = 0 }: AvalonMotionProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, z: -100 }}
        whileInView={{ opacity: 1, scale: 1, z: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
            duration: 1.2,
            ease: EASE_EXPO,
            delay: delay,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={className}
    >
        {children}
    </motion.div>
);
