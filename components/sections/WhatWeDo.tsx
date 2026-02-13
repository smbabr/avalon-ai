"use client";
import { SectionEntry } from "@/components/ui/Motion";
import Interactive3DCard from "@/components/3d/Interactive3DCard";

const cards = [
    {
        title: "Neural Architecture",
        description: "We build AI systems that operate with precision and silence, solving problems before they escalate."
    },
    {
        title: "Institutional Rigor",
        description: "Every model we deploy is tested against the highest standards of ethical responsibility and technical correctness."
    },
    {
        title: "Quiet Excellence",
        description: "We do not operate in the spotlight. We let results speak, allowing our systems to prove themselves in production."
    }
];

export default function WhatWeDo() {
    return (
        <section className="py-32 px-6 bg-avalon-surface/30">
            <div className="max-w-6xl mx-auto">

                <SectionEntry>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-light text-avalon-text-primary mb-6">
                            What We Do
                        </h2>
                        <p className="text-avalon-text-secondary max-w-2xl mx-auto leading-relaxed">
                            We design, build, and deploy AI systems with an institutional mindset. No hype. Just engineered intelligence.
                        </p>
                    </div>
                </SectionEntry>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <SectionEntry key={card.title} delay={index * 0.1}>
                            <Interactive3DCard intensity={10}>
                                <div className="p-8 bg-avalon-base border border-avalon-surface-alt hover:border-avalon-text-secondary/30 transition-all duration-300 rounded-sm min-h-[240px] flex flex-col">
                                    <h3 className="text-xl font-display font-medium text-avalon-text-primary mb-4 transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-avalon-text-secondary leading-relaxed flex-grow">
                                        {card.description}
                                    </p>

                                    {/* Subtle bottom accent line */}
                                    <div className="h-px w-12 bg-avalon-accent/40 mt-6" />
                                </div>
                            </Interactive3DCard>
                        </SectionEntry>
                    ))}
                </div>

            </div>
        </section>
    );
}
