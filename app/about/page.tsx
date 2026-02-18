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

                {/* The Institution */}
                <SectionEntry>
                    <div className="border-t border-avalon-surface-alt pt-12">
                        <div className="max-w-3xl mx-auto space-y-12 text-center">
                            <h2 className="text-4xl md:text-6xl font-display font-light leading-tight">The Discipline of <br /><span className="gradient-text italic">Intelligence</span></h2>
                            <div className="space-y-8 text-avalon-text-secondary leading-relaxed text-lg font-light">
                                <p>
                                    Avalon.ai is not just an educational platform; it is a discipline-driven institution designed to extract and refine the latent cognitive potential of our region.
                                </p>
                                <p>
                                    Our methodology is built on the belief that peak intelligence is achieved through silence, rigor, and technical excellence. We bridge the gap between world-class AI research and local talent, creating a direct pipeline for those willing to commit to the path.
                                </p>
                                <p>
                                    At Avalon, we focus on the "How" and the "Why" of artificial systems, moving beyond surface-level bootcamps to foster deep engineering expertise.
                                </p>
                            </div>
                        </div>
                    </div>
                </SectionEntry>

                {/* Core Pillars */}
                <SectionEntry>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Rigor", desc: "A strict curriculum modeled after the world's most elite research labs." },
                            { title: "Silence", desc: "Focusing on deep work and technical execution over marketing noise." },
                            { title: "Precision", desc: "Engineering solutions with mathematical accuracy and ethical grounding." }
                        ].map((pillar) => (
                            <div key={pillar.title} className="p-8 border border-avalon-surface-alt glass hover:border-avalon-accent transition-colors duration-500">
                                <h3 className="text-xl font-display font-medium mb-4">{pillar.title}</h3>
                                <p className="text-sm text-avalon-text-secondary leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </SectionEntry>

                {/* Strategic Roadmap */}
                <SectionEntry>
                    <div className="glass p-12 rounded-sm border border-avalon-surface-alt">
                        <h2 className="text-2xl font-display font-light mb-16 text-center tracking-widest uppercase">Institutional Roadmap</h2>
                        <div className="space-y-16">
                            <div className="flex flex-col md:flex-row gap-8 items-start relative">
                                <div className="md:w-1/4">
                                    <span className="text-xs font-mono text-avalon-accent mb-2 block pulse-glow tracking-[0.2em]">PHASE 1 (2025)</span>
                                    <h3 className="text-xl font-display font-medium">Foundation</h3>
                                </div>
                                <div className="md:w-3/4 text-avalon-text-secondary text-sm leading-relaxed pt-2">
                                    Establishing core campus nodes at QUEST and SBBU. Filtering and refining the first cohort of elite engineers through rigorous selection.
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-start relative opacity-60">
                                <div className="md:w-1/4">
                                    <span className="text-xs font-mono text-avalon-text-secondary/50 mb-2 block tracking-[0.2em]">PHASE 2 (2026+)</span>
                                    <h3 className="text-xl font-display font-medium">Global Nexus</h3>
                                </div>
                                <div className="md:w-3/4 text-avalon-text-secondary text-sm leading-relaxed pt-2">
                                    Direct integration with international AI research labs and decentralized computing networks. Scaling the discipline across the province.
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionEntry>

            </div>
        </main>
    );
}
