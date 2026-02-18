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
        <motion.nav
            suppressHydrationWarning
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-colors duration-300 ${isScrolled ? "bg-avalon-base/90 backdrop-blur-md border-b border-avalon-surface-alt" : "bg-transparent"
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
            {/* Standard Nav Content - Hidden when menu is open to prevent double-rendering */}
            <div className={`flex items-center justify-between w-full transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0 invisible" : "opacity-100 visible"}`}>
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
                    {/* Mobile Menu Toggle - Stays visible even when main nav content fades */}
                </div>
            </div>

            {/* Mobile Toggle Button - Guaranteed Layering */}
            <button
                className="md:hidden z-[120] focus:outline-none fixed right-6 top-6 h-10 px-4 flex items-center justify-center bg-avalon-surface-alt/50 backdrop-blur-sm border border-avalon-surface-alt rounded-sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-avalon-accent">
                    {isMobileMenuOpen ? "CLOSE" : "MENU"}
                </span>
            </button>

            {/* Mobile Drawer - Immersive Layer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[110] md:hidden"
                        style={{ backgroundColor: '#050505' }} // Forced Opaque Hex
                    >
                        <div className="flex flex-col h-full w-full p-8 justify-between relative">
                            {/* Drawer Header */}
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/logo.png"
                                    alt="Avalon.ai Logo"
                                    width={28}
                                    height={28}
                                    className="w-7 h-7 object-contain"
                                />
                                <span className="font-display font-medium text-lg tracking-normal text-avalon-text-primary">Avalon.ai</span>
                            </div>

                            {/* Navigation Links - Scaled for high-density mobile displays */}
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
                                        transition={{ delay: 0.1 + idx * 0.04 }}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-3xl font-display font-light text-avalon-text-primary active:text-avalon-accent transition-colors py-2 border-b border-avalon-surface-alt/10 w-full block"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Drawer Footer */}
                            <div className="border-t border-avalon-surface-alt pt-8 flex flex-col gap-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-mono text-avalon-text-secondary tracking-[0.2em] uppercase mb-2">Technical Status</p>
                                        <BackendStatus />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-mono text-avalon-accent/80 tracking-widest uppercase mb-1">Avalon Nexus</p>
                                        <p className="text-[10px] font-mono text-avalon-text-secondary opacity-50">EST. 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
