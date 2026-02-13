"use client";
import { SectionEntry } from "@/components/ui/Motion";
import { motion } from "framer-motion";

const principles = [
    "Precision before speed.",
    "Silence over spectacle.",
    "Ethics embedded, not added.",
    "Systems that endure decades.",
    "Intelligence that respects humans."
];

export default function Principles() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-4xl mx-auto">

                <SectionEntry>
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-light text-avalon-text-primary mb-8">
                            Operating Principles
                        </h2>
                        <p className="text-avalon-text-secondary text-lg leading-relaxed max-w-2xl">
                            These are not aspirations. They are constraints we've chosen to operate within.
                        </p>
                    </div>
                </SectionEntry>

                <div className="space-y-6">
                    {principles.map((principle, idx) => (
                        <SectionEntry key={idx} delay={idx * 0.08}>
                            <motion.div
                                whileHover={{ x: 8 }}
                                transition={{ duration: 0.2 }}
                                className="group flex items-start gap-6 py-4 border-l-2 border-avalon-surface-alt hover:border-avalon-accent hover:glow-accent pl-8 transition-all duration-300 glass-light rounded-r-sm"
                            >
                                <span className="text-xs font-mono text-avalon-accent mt-1 min-w-[32px] pulse-glow">
                                    0{idx + 1}
                                </span>
                                <p className="text-xl font-light text-avalon-text-primary group-hover:text-avalon-accent transition-colors">
                                    <span className="group-hover:shimmer p-1 rounded-sm">
                                        {principle}
                                    </span>
                                </p>
                            </motion.div>
                        </SectionEntry>
                    ))}
                </div>

            </div>
        </section>
    );
}
