"use client";
import { FadeIn } from "@/components/ui/Motion";
import Scene3D from "@/components/ui/Scene3D";
import ParticleField from "@/components/3d/ParticleField";
import FloatingGeometry from "@/components/3d/FloatingGeometry";
import { use3DMouseTracking } from "@/hooks/use3DMouseTracking";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import MagneticButton from "@/components/effects/MagneticButton";

export default function Hero() {
    const mouse = use3DMouseTracking({ intensity: 0.5, smoothing: 0.08 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
            {/* 3D Scene Loading Overlay - Only on Desktop */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="hero-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[20] bg-avalon-base hidden md:flex items-center justify-center"
                    >
                        <div className="w-8 h-8 border border-avalon-accent/30 border-t-avalon-accent rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile-Only Static/Animated Background (Extremely Lightweight) */}
            <div className="absolute inset-0 z-0 md:hidden animated-gradient opacity-20" />

            {/* 3D Background Scene - Desktop Only for performance */}
            <div className="absolute inset-0 z-0 hidden md:block">
                <Scene3D camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ParticleField
                        mouseX={mouse.normalizedX}
                        mouseY={mouse.normalizedY}
                    />
                    <FloatingGeometry
                        type="dodecahedron"
                        position={[-3, 2, -3]}
                        scale={1.8}
                        rotationSpeed={0.3}
                    />
                    <FloatingGeometry
                        type="icosahedron"
                        position={[4, -1, -4]}
                        scale={1.4}
                        rotationSpeed={0.25}
                    />
                    <ambientLight intensity={0.6} />
                </Scene3D>
            </div>

            {/* Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-avalon-base z-0 pointer-events-none" />

            <div className="z-10 max-w-5xl space-y-10">
                <FadeIn delay={0.2}>
                    <div className="inline-block px-3 py-1 mb-4 border border-avalon-surface-alt rounded-full backdrop-blur-sm bg-avalon-base/30">
                        <span className="text-xs uppercase tracking-widest text-avalon-accent/80 font-medium">Neural Systems v1.0</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-extralight tracking-tighter text-balance leading-[0.9]">
                        Intelligence in <br className="hidden md:block" />
                        <span className="gradient-text italic">Silence</span> & Precision.
                    </h1>
                </FadeIn>

                <FadeIn delay={0.5} className="max-w-xl mx-auto">
                    <p className="text-lg md:text-xl text-avalon-text-secondary text-balance leading-relaxed font-light">
                        The most powerful systems do not try to impress. <br />
                        They operate in the background, solving complexity with calm authority.
                    </p>
                </FadeIn>

                <FadeIn delay={0.7}>
                    <div className="flex gap-6 justify-center items-center mt-8">
                        <FadeIn delay={0.8}>
                            <MagneticButton className="bg-avalon-text-primary text-avalon-base px-8 py-3.5 rounded-sm font-medium text-sm uppercase tracking-wider hover:bg-avalon-accent transition-all duration-200 shadow-lg shadow-avalon-text-primary/20">
                                Explore Systems
                            </MagneticButton>
                        </FadeIn>
                        <FadeIn delay={0.95}>
                            <MagneticButton className="text-avalon-text-secondary hover:text-avalon-text-primary border border-avalon-surface-alt hover:border-avalon-text-secondary px-6 py-3 text-sm uppercase tracking-widest transition-all duration-200 rounded-sm">
                                Manifesto
                            </MagneticButton>
                        </FadeIn>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
