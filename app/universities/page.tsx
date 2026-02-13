"use client";
import { FadeIn, SectionEntry } from "@/components/ui/Motion";

export default function Universities() {
    return (
        <main className="min-h-screen bg-avalon-base pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">

                <section className="mb-24 text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-6xl font-display font-light mb-6">Campus Nodes</h1>
                        <p className="text-avalon-text-secondary max-w-xl mx-auto leading-relaxed">
                            Avalon operates through structured nodes within established universities. We inject high-density AI curriculum into the academic bloodstream.
                        </p>
                    </FadeIn>
                </section>

                <div className="space-y-32">

                    {/* QUEST Node */}
                    <SectionEntry>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="p-10 border border-avalon-surface-alt bg-avalon-surface/50 glass hover:glow-accent hover:-translate-y-1 transition-all duration-500 rounded-sm">
                                <h2 className="text-xs font-mono text-avalon-accent tracking-widest mb-4 pulse-glow">NODE_01</h2>
                                <h3 className="text-3xl font-display font-medium mb-6 gradient-text">Avalon.QUEST</h3>
                                <div className="space-y-4 text-sm text-avalon-text-secondary leading-relaxed">
                                    <p>
                                        <strong className="text-avalon-text-primary">Mission:</strong> To transform QUEST's engineering talent into production-ready AI specialists.
                                    </p>
                                    <p>
                                        <strong className="text-avalon-text-primary">Selection:</strong> We filter for seriousness. Only the top 5% of applicants who demonstrate discipline and logic are admitted.
                                    </p>
                                    <p>
                                        <strong className="text-avalon-text-primary">Structure:</strong> Weekly intensive workshops, peer-review circles, and mandatory project delivery.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block h-64 animated-gradient border border-avalon-accent/20 rounded-sm relative overflow-hidden group">
                                <div className="absolute inset-0 shimmer opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border border-avalon-accent/30 pulse-glow flex items-center justify-center">
                                        <span className="text-xs font-mono text-avalon-accent">QUEST_CORE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionEntry>

                    {/* SBBU Node */}
                    <SectionEntry>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                            <div className="hidden md:block h-64 animated-gradient border border-avalon-accent/20 rounded-sm relative overflow-hidden group">
                                <div className="absolute inset-0 shimmer opacity-20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border border-avalon-accent/30 pulse-glow flex items-center justify-center">
                                        <span className="text-xs font-mono text-avalon-accent">SBBU_CORE</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 border border-avalon-surface-alt bg-avalon-surface/50 glass hover:glow-accent hover:-translate-y-1 transition-all duration-500 rounded-sm">
                                <h2 className="text-xs font-mono text-avalon-text-primary tracking-widest mb-4 pulse-glow">NODE_02</h2>
                                <h3 className="text-3xl font-display font-medium mb-6 gradient-text">Avalon.SBBU</h3>
                                <div className="space-y-4 text-sm text-avalon-text-secondary leading-relaxed">
                                    <p>
                                        <strong className="text-avalon-text-primary">Status:</strong> Proposal Approved / Core Team Assembly.
                                    </p>
                                    <p>
                                        <strong className="text-avalon-text-primary">Growth Model:</strong> Following the successful template of the QUEST node, we are expanding to Shaheed Benazir Bhutto University to capture a broader disciplined talent pool.
                                    </p>
                                    <p>
                                        <strong className="text-avalon-text-primary">Pipeline:</strong> Direct mentorship from the QUEST senior cohort to ensure culture transfer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SectionEntry>

                </div>

            </div>
        </main>
    );
}
