"use client";
import { FadeIn, SectionEntry } from "@/components/ui/Motion";
import { useEffect, useState } from "react";

interface NodeData {
    nodeId: string;
    name: string;
    mission: string;
    selection: string;
    structure: string;
    status: string;
}

export default function Universities() {
    const [nodes, setNodes] = useState<NodeData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const response = await fetch('/api/nodes');
                const data = await response.json();

                // Safety check: ensure we only set nodes if we got a valid array
                if (Array.isArray(data)) {
                    setNodes(data);
                } else {
                    console.error("Universities API did not return an array:", data);
                    setNodes([]);
                }
            } catch (err) {
                console.error("Failed to fetch node data:", err);
                setNodes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNodes();
    }, []);

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
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-12 h-12 border-2 border-avalon-accent border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        nodes.map((node, idx) => (
                            <SectionEntry key={node.nodeId}>
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="p-10 border border-avalon-surface-alt bg-avalon-surface/50 glass hover:glow-accent hover:-translate-y-1 transition-all duration-500 rounded-sm">
                                        <h2 className="text-xs font-mono text-avalon-accent tracking-widest mb-4 pulse-glow">
                                            {node.nodeId || `NODE_0${idx + 1}`}
                                        </h2>
                                        <h3 className="text-3xl font-display font-medium mb-6 gradient-text">{node.name}</h3>
                                        <div className="space-y-4 text-sm text-avalon-text-secondary leading-relaxed">
                                            <p>
                                                <strong className="text-avalon-text-primary">Mission:</strong> {node.mission}
                                            </p>
                                            <p>
                                                <strong className="text-avalon-text-primary">Selection:</strong> {node.selection}
                                            </p>
                                            <p>
                                                <strong className="text-avalon-text-primary">Structure:</strong> {node.structure}
                                            </p>
                                            {node.status && (
                                                <p className="pt-2">
                                                    <span className="text-[10px] font-mono bg-avalon-accent/10 text-avalon-accent px-2 py-1 rounded-sm uppercase tracking-tighter">
                                                        Status: {node.status}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hidden md:block h-64 animated-gradient border border-avalon-accent/20 rounded-sm relative overflow-hidden group">
                                        <div className="absolute inset-0 shimmer opacity-20" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-40 h-40 rounded-full border border-avalon-accent/30 pulse-glow flex items-center justify-center bg-avalon-base/30 backdrop-blur-sm">
                                                <span className="text-xs font-mono text-avalon-accent text-center px-4">
                                                    {node.name.split('.')[1] || node.name}_CORE
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SectionEntry>
                        ))
                    )}
                </div>

            </div>
        </main>
    );
}
