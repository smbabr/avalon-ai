"use client";
import { FadeIn, SectionEntry } from "@/components/ui/Motion";
import { motion } from "framer-motion";

export default function Conduct() {
    return (
        <main className="min-h-screen bg-avalon-base pt-32 pb-20 px-6 font-sans relative overflow-hidden">
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-avalon-accent opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">

                <FadeIn>
                    <header className="mb-24">
                        <h1 className="text-xs font-mono uppercase tracking-[0.3em] text-avalon-accent mb-4 pulse-glow">Official Protocol_v2.0</h1>
                        <h2 className="text-5xl md:text-7xl font-display font-light text-avalon-text-primary gradient-text">Code of Conduct</h2>
                    </header>
                </FadeIn>

                <div className="space-y-24">

                    <SectionEntry>
                        <section className="group p-8 border-l-2 border-avalon-accent glass hover:glow-accent transition-all duration-500 rounded-r-sm">
                            <h3 className="text-2xl font-display font-medium mb-8 text-avalon-accent shimmer inline-block">01. Student Discipline</h3>
                            <ul className="space-y-6 text-avalon-text-secondary leading-relaxed list-none">
                                <li className="flex items-start gap-4 group/item">
                                    <span className="w-1.5 h-1.5 rounded-full bg-avalon-accent mt-2 group-hover/item:scale-150 transition-transform" />
                                    <p>
                                        <strong className="text-avalon-text-primary group-hover/item:text-avalon-accent transition-colors">Attendance is Absolute.</strong> <br />
                                        Missing sessions without critical operational reason is grounds for immediate dismissal from the node.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4 group/item">
                                    <span className="w-1.5 h-1.5 rounded-full bg-avalon-accent mt-2 group-hover/item:scale-150 transition-transform" />
                                    <p>
                                        <strong className="text-avalon-text-primary group-hover/item:text-avalon-accent transition-colors">No Shortcuts.</strong> <br />
                                        The use of generated code without complete cognitive mapping is strictly prohibited. You must be the master of every line.
                                    </p>
                                </li>
                                <li className="flex items-start gap-4 group/item">
                                    <span className="w-1.5 h-1.5 rounded-full bg-avalon-accent mt-2 group-hover/item:scale-150 transition-transform" />
                                    <p>
                                        <strong className="text-avalon-text-primary group-hover/item:text-avalon-accent transition-colors">Respect & Unity.</strong> <br />
                                        Avalon is a sanctuary of intellect. Harassment or bias is met with immediate expulsion. We move as one.
                                    </p>
                                </li>
                            </ul>
                        </section>
                    </SectionEntry>

                    <SectionEntry>
                        <section className="group p-8 border-l-2 border-avalon-surface-alt hover:border-avalon-accent glass hover:glow-accent transition-all duration-500 rounded-r-sm">
                            <h3 className="text-2xl font-display font-medium mb-8 text-avalon-text-primary group-hover:text-avalon-accent transition-colors shimmer inline-block">02. Leadership Code</h3>
                            <div className="space-y-6 text-avalon-text-secondary leading-relaxed">
                                <p className="text-xl font-light italic">"Leaders eat last. Responsibility precedes authority."</p>
                                <p>We maintain <strong className="text-avalon-text-primary group-hover:text-avalon-accent transition-colors">Public Unity</strong>. Disagreements are verified and resolved in private, rigorous debate. Once resolved, the node executes with total synchronization.</p>
                            </div>
                        </section>
                    </SectionEntry>

                    <SectionEntry>
                        <section className="group">
                            <h3 className="text-2xl font-display font-medium mb-8 text-avalon-text-primary group-hover:text-avalon-accent transition-colors shimmer inline-block">03. AI Ethics Commitment</h3>
                            <div className="p-10 border border-avalon-accent/20 bg-avalon-accent/[0.02] glass glow-accent transition-all duration-700">
                                <p className="mb-8 text-avalon-text-primary font-medium tracking-wide">As architects of the next intelligence, we pledge:</p>
                                <ul className="space-y-4 list-none font-mono text-xs tracking-[0.2em] text-avalon-accent">
                                    <li className="flex items-center gap-4">
                                        <div className="w-2 h-2 border border-avalon-accent pulse-glow" />
                                        NO_ACADEMIC_CHEATING
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-2 h-2 border border-avalon-accent pulse-glow" />
                                        NO_MISINFORMATION_SPREAD
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-2 h-2 border border-avalon-accent pulse-glow" />
                                        NO_EXPLOITATIVE_AUTOMATION
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </SectionEntry>

                </div>

            </div>
        </main>
    );
}
