"use client";
import { useState } from "react";
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

    return (
        <motion.nav
            suppressHydrationWarning
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-colors duration-300 ${isScrolled ? "bg-avalon-base/90 backdrop-blur-md border-b border-avalon-surface-alt" : "bg-transparent"
                }`}
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

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
                className="md:hidden text-avalon-text-primary z-[60] focus:outline-none relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? (
                    <span className="font-mono text-xs font-medium tracking-wider">CLOSE</span>
                ) : (
                    <span className="font-mono text-xs font-medium tracking-wider">MENU</span>
                )}
            </button>

            {/* Mobile Drawer - Immersive Layer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] md:hidden"
                    >
                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-avalon-base/95 backdrop-blur-xl"
                        />

                        {/* Content Container */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative h-full w-full flex flex-col p-8 justify-between"
                        >
                            {/* Drawer Header */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/logo.png"
                                        alt="Avalon.ai Logo"
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 object-contain"
                                    />
                                    <span className="font-display font-medium text-lg tracking-tight">Avalon.ai</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-3 text-avalon-accent hover:bg-avalon-accent/10 rounded-full transition-colors"
                                >
                                    <span className="font-mono text-xs tracking-widest">CLOSE</span>
                                </button>
                            </div>

                            {/* Main Navigation Links */}
                            <div className="space-y-6">
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
                                            className="text-5xl font-display font-light text-avalon-text-primary hover:text-avalon-accent transition-all duration-300 block"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Drawer Footer */}
                            <div className="border-t border-avalon-surface-alt/20 pt-8 flex justify-between items-end">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-mono text-avalon-text-secondary tracking-[0.2em] uppercase">Status</p>
                                    <BackendStatus />
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-mono text-avalon-accent/60 tracking-widest uppercase">Avalon v1.0</p>
                                    <p className="text-[10px] font-mono text-avalon-text-secondary">© 2025</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
