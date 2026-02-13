import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-20 px-6 border-t border-avalon-surface-alt bg-avalon-base text-center md:text-left">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="space-y-4">
                    <p className="text-sm font-display font-medium text-avalon-text-primary">Avalon.ai Institute</p>
                    <p className="text-xs text-avalon-text-secondary leading-relaxed max-w-xs">
                        A disciplined AI institution quietly forming in Nawabshah, SBA. Built on the principles of precision, silence, and intelligence.
                    </p>
                </div>

                {/* Links Column */}
                <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-avalon-text-secondary/50">Explore</h4>
                    <div className="flex flex-col space-y-2 text-sm text-avalon-text-secondary">
                        <Link href="/about" className="hover:text-avalon-text-primary transition-colors">About</Link>
                        <Link href="/universities" className="hover:text-avalon-text-primary transition-colors">Universities</Link>
                        <Link href="/conduct" className="hover:text-avalon-text-primary transition-colors">Conduct</Link>
                        <Link href="/team" className="hover:text-avalon-text-primary transition-colors">Team</Link>
                    </div>
                </div>

                {/* Legal Column */}
                <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-avalon-text-secondary/50">Legal</h4>
                    <div className="flex flex-col space-y-2 text-sm text-avalon-text-secondary">
                        <Link href="/conduct" className="hover:text-avalon-text-primary transition-colors">Code of Conduct</Link>
                        <Link href="#" className="hover:text-avalon-text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-avalon-text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>

                {/* Contact Column */}
                <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-avalon-text-secondary/50">Contact</h4>
                    <div className="text-sm text-avalon-text-secondary space-y-1">
                        <p>inquiries@avalon.ai</p>
                        <p>Nawabshah, Shaheed Benazirabad</p>
                        <p>Sindh, Pakistan</p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-avalon-surface-alt flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-avalon-text-secondary/50 font-mono">
                <p>© 2026 AVALON.AI SYSTEMS. ALL RIGHTS RESERVED.</p>
                <p>OPERATING SYSTEM: v2.4.0</p>
            </div>
        </footer>
    );
}
