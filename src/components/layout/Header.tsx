"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";

export function Header() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
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

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Courses", href: "/courses" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
                <motion.div
                    layout
                    initial={{ width: "100%", borderRadius: "10px", y: 0, backgroundColor: "rgba(255, 255, 255, 0.79)" }}
                    animate={{
                        width: isScrolled ? "90%" : "100%",
                        maxWidth: isScrolled ? "1024px" : "100%",
                        borderRadius: isScrolled ? "9999px" : "9999px",
                        y: isScrolled ? 10 : 0,
                        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.79)",
                        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
                        border: isScrolled ? "1px solid rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: isScrolled
                            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                            : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                    }}
                    className={cn(
                        "pointer-events-auto flex items-center justify-between px-6 py-3 transition-all duration-300",
                        !isScrolled && "bg-white/80 backdrop-blur-md border-b border-slate-200"
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 shrink-0 z-50" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            AtreusPhysio
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button & Mobile Toggle */}
                    <div className="flex items-center gap-4 shrink-0 z-50">
                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className={cn(
                                "hidden md:inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                                isScrolled
                                    ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl"
                                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                            )}
                        >
                            Book Now
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-slate-900 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors font-display"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Socials & Contact */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col items-center gap-6 mt-8"
                            >
                                <div className="flex gap-6">
                                    {[
                                        { icon: "Instagram", href: "#" },
                                        { icon: "Linkedin", href: "#" },
                                        { icon: "Twitter", href: "#" },
                                        { icon: "Facebook", href: "#" },
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.href}
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all"
                                        >
                                            {/* Icons would go here, using placeholders for now or lucide-react if imported */}
                                            <span className="text-xs">{social.icon[0]}</span>
                                        </a>
                                    ))}
                                </div>
                                <div className="text-center text-slate-500 text-sm">
                                    <p>+91 98765 43210</p>
                                    <p>contact@atreusphysio.in</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-4"
                            >
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsBookingOpen(true);
                                    }}
                                    className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-10 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105"
                                >
                                    Book Now
                                </button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <GlobalBookingDialog isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
