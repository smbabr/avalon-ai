"use client";
import { FadeIn, SectionEntry } from "@/components/ui/Motion";
import Image from "next/image";

export default function About() {
    return (
        <main className="min-h-screen bg-avalon-base pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto space-y-32">

                {/* Core Positioning */}
                <section className="relative p-12 rounded-sm animated-gradient border border-avalon-accent/20 overflow-hidden">
                    <div className="absolute inset-0 shimmer opacity-10 pointer-events-none" />
                    <FadeIn>
                        <h1 className="text-5xl md:text-7xl font-display font-light leading-tight mb-8">
                            <span className="float inline-block">An</span> <span className="float inline-block delay-100">Institutional</span> <br />
                            <span className="gradient-text italic shimmer p-1 rounded-sm">Approach</span> to AI Education.
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-xl text-avalon-text-primary leading-relaxed max-w-2xl font-light">
                            We are not a bootcamp. We are not a startup. <br />
                            <span className="text-avalon-accent pulse-glow font-medium">We are a discipline-driven institution built to unlock the latent intelligence of Nawabshah.</span>
                        </p>
                    </FadeIn>
                </section>

                {/* Founder Section */}
                <SectionEntry>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-t border-avalon-surface-alt pt-12">
                        <div className="md:col-span-4">
                            <div className="aspect-[3/4] bg-avalon-surface relative overflow-hidden rounded-sm border border-avalon-surface-alt grayscale hover:grayscale-0 transition-all duration-700">
                                {/* Placeholder for Founder Portrait */}
                                <div className="absolute inset-0 flex items-center justify-center text-avalon-text-secondary/20">
                                    PORTRAIT
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-display font-medium">Founder Name</h3>
                                <p className="text-xs text-avalon-text-secondary font-mono tracking-wider">FOUNDING DIRECTOR</p>
                            </div>
                        </div>

                        <div className="md:col-span-8 space-y-8">
                            <h2 className="text-3xl font-display font-light">The Discipline of Intelligence</h2>
                            <div className="space-y-6 text-avalon-text-secondary leading-relaxed">
                                <p>
                                    My journey began with a realization during my time teaching AI with PIAIC: talent is evenly distributed, but opportunity is concentrated.
                                </p>
                                <p>
                                    Nawabshah (SBA) represents a reservoir of untapped cognitive potential. We are here to prove that with strict discipline, world-class curriculum, and ethical grounding, this region can produce global-tier AI engineers.
                                </p>
                                <p>
                                    We do not offer shortcuts. We offer a rigorous path for those willing to walk it.
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionEntry>

                {/* Vision Section */}
                <SectionEntry>
                    <div className="border-l-2 border-avalon-accent pl-8 py-2 glass p-8 rounded-r-lg">
                        <h2 className="text-2xl font-display font-light mb-12 gradient-text">Strategic Roadmap</h2>
                        <div className="space-y-12">
                            <div className="group relative p-6 border border-avalon-surface-alt hover:border-avalon-accent transition-all duration-500 hover:glow-accent">
                                <span className="text-xs font-mono text-avalon-accent mb-2 block pulse-glow">PHASE 1 (2025-2026)</span>
                                <h3 className="text-xl text-avalon-text-primary mb-2 group-hover:shimmer inline-block">The Foundation</h3>
                                <p className="text-sm text-avalon-text-secondary">Establishing core campus nodes at QUEST and SBBU. Filtering the first cohort of elite engineers.</p>
                            </div>
                            <div className="group relative p-6 border border-avalon-surface-alt hover:border-avalon-accent transition-all duration-500 hover:glow-accent opacity-70 hover:opacity-100">
                                <span className="text-xs font-mono text-avalon-text-secondary/50 mb-2 block">PHASE 2 (2027-2028)</span>
                                <h3 className="text-xl text-avalon-text-primary/70 mb-2">Institutional Scale</h3>
                                <p className="text-sm text-avalon-text-secondary/70">Connecting with global research labs. Launching the dedicated Avalon Research Center.</p>
                            </div>
                        </div>
                    </div>
                </SectionEntry>

            </div>
        </main>
    );
}
