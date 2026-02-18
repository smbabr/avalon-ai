"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ui/ThemeToggle";
import BackendStatus from "@/components/ui/BackendStatus";

export default function Navigation() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 24);
    });

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.nav
                suppressHydrationWarning
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:py-6 transition-colors duration-300 ${isScrolled ? "bg-avalon-base/90 backdrop-blur-md border-b border-avalon-surface-alt" : "bg-transparent"
                    } ${isMobileMenuOpen ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible"}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
                <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
                    <Image
                        src="/logo.png"
                        alt="Avalon.ai Logo"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                        priority
                    />
                    <div className="flex flex-col">
                        <span className="font-display font-medium text-xl tracking-tight leading-none">Avalon.ai</span>
                        <div className="hidden md:block mt-1">
                            <BackendStatus />
                        </div>
                    </div>
                </Link>

                <div className="hidden md:flex gap-8 text-sm font-medium text-avalon-text-secondary">
                    {[
                        { name: "Home", path: "/" },
                        { name: "About", path: "/about" },
                        { name: "Universities", path: "/universities" },
                        { name: "Conduct", path: "/conduct" },
                        { name: "Team", path: "/team" },
                        { name: "Contact", path: "/contact" }
                    ].map((item) => (
                        <Link key={item.name} href={item.path} className="hover:text-avalon-text-primary transition-colors duration-200">
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-avalon-text-primary focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="font-mono text-xs font-medium tracking-widest text-avalon-accent">MENU</span>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Drawer - Immersive Overhaul - Moved OUTSIDE of nav to escape stacking context */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 md:hidden flex flex-col pt-24 p-10 justify-between"
                        style={{ zIndex: 9999, backgroundColor: '#050505' }}
                    >
                        {/* Drawer Header with Close Button */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/logo.png"
                                    alt="Avalon.ai Logo"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 object-contain"
                                />
                                <span className="font-display font-medium text-lg tracking-tight text-avalon-text-primary">Avalon.ai</span>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="h-10 px-4 border border-avalon-accent/30 rounded-full flex items-center justify-center bg-avalon-accent/5"
                            >
                                <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-avalon-accent translate-x-[0.2em]">CLOSE</span>
                            </button>
                        </div>

                        {/* Navigation Links - Rescaled for better vertical space */}
                        <div className="flex flex-col space-y-4">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About", path: "/about" },
                                { name: "Universities", path: "/universities" },
                                { name: "Conduct", path: "/conduct" },
                                { name: "Team", path: "/team" },
                                { name: "Contact", path: "/contact" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-display font-light text-avalon-text-primary active:text-avalon-accent transition-colors py-3 border-b border-white/5 block"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Drawer Footer */}
                        <div className="border-t border-avalon-surface-alt pt-8 flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-mono text-avalon-text-secondary tracking-[0.2em] uppercase mb-2">Institutional Link</p>
                                <BackendStatus />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-mono text-avalon-accent/60 tracking-widest uppercase mb-1">Avalon v1.0</p>
                                <p className="text-[10px] font-mono text-avalon-text-secondary">© 2025 AVALON.AI</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
