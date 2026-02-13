"use client";
import { FadeIn } from "@/components/ui/Motion";
import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/effects/MagneticButton";

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Submission failed');
            }

            setStatus('success');
            // Reset form logic would go here
        } catch (err: any) {
            setStatus('error');
            setErrorMsg(err.message);
        }
    }

    return (
        <main className="min-h-screen bg-avalon-base pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-avalon-accent opacity-[0.03] blur-[150px] -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-avalon-accent opacity-[0.02] blur-[100px] -z-10 rounded-full" />

            <div className="w-full max-w-xl">

                <FadeIn>
                    <header className="mb-16 text-center">
                        <h1 className="text-4xl md:text-5xl font-display font-light mb-4 gradient-text">Initial Communication</h1>
                        <p className="text-avalon-text-secondary text-sm font-mono tracking-widest uppercase opacity-60">
                            Protocol 00-A: Signal Initiation
                        </p>
                    </header>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="glass p-8 md:p-12 rounded-sm border border-avalon-accent/20 relative overflow-hidden group">
                        <div className="absolute inset-0 animated-gradient opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700" />
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-avalon-accent pulse-glow">Full Name</label>
                                    <input required type="text" name="name" id="name" className="w-full bg-avalon-base/50 border border-avalon-surface-alt px-4 py-4 text-avalon-text-primary focus:border-avalon-accent focus:glow-accent focus:outline-none transition-all duration-300 rounded-sm text-sm" placeholder="TYPE_NAME..." />
                                </div>
                                <div className="space-y-3">
                                    <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-avalon-accent pulse-glow">Email Address</label>
                                    <input required type="email" name="email" id="email" className="w-full bg-avalon-base/50 border border-avalon-surface-alt px-4 py-4 text-avalon-text-primary focus:border-avalon-accent focus:glow-accent focus:outline-none transition-all duration-300 rounded-sm text-sm" placeholder="TYPE_EMAIL..." />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="institution" className="text-[10px] font-mono uppercase tracking-widest text-avalon-text-secondary">Institution / Organization</label>
                                <input type="text" name="institution" id="institution" className="w-full bg-avalon-base/50 border border-avalon-surface-alt px-4 py-4 text-avalon-text-primary focus:border-avalon-accent focus:glow-accent focus:outline-none transition-all duration-300 rounded-sm text-sm" placeholder="OPTIONAL_FIELD..." />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-avalon-text-secondary">Message</label>
                                <textarea required name="message" id="message" rows={6} className="w-full bg-avalon-base/50 border border-avalon-surface-alt px-4 py-4 text-avalon-text-primary focus:border-avalon-accent focus:glow-accent focus:outline-none transition-all duration-300 rounded-sm text-sm resize-none" placeholder="TRANSMIT_INTENT..."></textarea>
                            </div>

                            {status === 'error' && (
                                <p className="text-red-500 text-[10px] font-mono text-center shimmer p-2 bg-red-500/5">{errorMsg}</p>
                            )}

                            {status === 'success' ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-avalon-accent/10 border border-avalon-accent/30 text-avalon-accent text-center text-sm font-mono glow-accent-strong">
                                    SIGNAL TRANSMITTED SUCCESSFULLY.
                                </motion.div>
                            ) : (
                                <MagneticButton
                                    disabled={status === 'submitting'}
                                    type="submit"
                                    className="w-full bg-avalon-accent text-avalon-base py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 glow-accent hover:glow-accent-strong"
                                >
                                    {status === 'submitting' ? 'PROCESSING...' : 'INITIATE TRANSMISSION'}
                                </MagneticButton>
                            )}
                        </form>
                    </div>
                </FadeIn>

            </div>
        </main>
    );
}
