"use client";
import { FadeIn, SectionEntry } from "@/components/ui/Motion";

const TeamCard = ({ name, role, type }: { name: string, role: string, type: "core" | "lead" | "mentor" }) => (
    <div className={`
      group p-8 border bg-avalon-base transition-all duration-500 glass
      ${type === 'core' ? 'border-avalon-accent/30 shadow-lg shadow-avalon-accent/5' : 'border-avalon-surface-alt'}
      hover:border-avalon-accent hover:glow-accent hover:-translate-y-2 preserve-3d
    `}>
        <div className="flex justify-between items-start mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500 group-hover:scale-110 group-hover:glow-accent-strong pulse-glow
          ${type === 'core' ? 'bg-avalon-accent text-avalon-base' : 'bg-avalon-surface text-avalon-text-secondary'}
       `}>
                {name.charAt(0)}
            </div>
            {type === 'core' && <span className="text-[10px] text-avalon-accent tracking-widest font-mono shimmer p-1 rounded-sm">CORE</span>}
        </div>

        <h3 className="text-2xl font-display font-medium text-avalon-text-primary mb-2 group-hover:gradient-text transition-all duration-300">{name}</h3>
        <p className="text-xs text-avalon-text-secondary uppercase tracking-wider font-mono group-hover:text-avalon-accent transition-colors">{role}</p>

        <div className="mt-6 pt-6 border-t border-avalon-surface-alt opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] font-mono text-avalon-accent/60">DISCIPLINE_LVL: 0{type === 'core' ? 9 : type === 'lead' ? 7 : 5}</span>
        </div>
    </div>
);

export default function Team() {
    return (
        <main className="min-h-screen bg-avalon-base pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">

                <header className="mb-24 text-center">
                    <FadeIn>
                        <h1 className="text-4xl md:text-6xl font-display font-light mb-6">The Architects</h1>
                        <p className="text-avalon-text-secondary max-w-xl mx-auto">
                            A structured hierarchy of builders, researchers, and mentors dedicated to the Avalon mission.
                        </p>
                    </FadeIn>
                </header>

                <div className="space-y-24">

                    {/* Core Leadership */}
                    <SectionEntry>
                        <h2 className="text-xs font-mono text-avalon-text-secondary/50 uppercase tracking-widest mb-8 border-b border-avalon-surface-alt pb-4">Core Leadership</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <TeamCard name="Babar Sahito" role="Founder" type="core" />
                            <TeamCard name="Miss Fatima Shaikh" role="Co-Founder" type="core" />
                        </div>
                    </SectionEntry>

                    {/* Campus Leads */}
                    <SectionEntry>
                        <h2 className="text-xs font-mono text-avalon-text-secondary/50 uppercase tracking-widest mb-8 border-b border-avalon-surface-alt pb-4">Campus Node Leads</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <TeamCard name="Lead Name" role="QUEST Node Lead" type="lead" />
                            <TeamCard name="Lead Name" role="SBBU Node Lead" type="lead" />
                            <div className="p-6 border border-avalon-surface-alt border-dashed flex items-center justify-center opacity-50">
                                <span className="text-xs font-mono text-avalon-text-secondary">NODE_03 PENDING</span>
                            </div>
                        </div>
                    </SectionEntry>

                    {/* Mentors */}
                    <SectionEntry>
                        <h2 className="text-xs font-mono text-avalon-text-secondary/50 uppercase tracking-widest mb-8 border-b border-avalon-surface-alt pb-4">Mentors & Advisors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <TeamCard key={i} name={`Mentor ${i}`} role="Technical Advisor" type="mentor" />
                            ))}
                            <div className="p-6 border border-avalon-surface-alt border-dashed flex items-center justify-center opacity-50">
                                <span className="text-xs font-mono text-avalon-text-secondary">JOIN THE NETWORK</span>
                            </div>
                        </div>
                    </SectionEntry>

                </div>

            </div>
        </main>
    );
}
