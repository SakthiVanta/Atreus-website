"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";

import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeNav, setActiveNav] = useState("/");

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
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
                    initial={{ width: "100%", y: 0 }}
                    animate={{
                        width: isScrolled ? "min(95%, 1200px)" : "100%",
                        y: isScrolled ? 8 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 35,
                    }}
                    className="pointer-events-auto relative"
                >
                    {/* Gradient border container */}
                    <div className={cn(
                        "relative rounded-full p-[1px] transition-all duration-500",
                        "bg-gradient-to-r from-[#06113d]/20 via-[#e3171e]/20 to-[#06113d]/20 dark:from-[#06113d]/40 dark:via-[#e3171e]/40 dark:to-[#06113d]/40"
                    )}>
                        {/* Main navbar content */}
                        <div className={cn(
                            "flex items-center justify-between px-6 py-3.5 rounded-full backdrop-blur-xl transition-all duration-500",
                            "bg-white/90 dark:bg-slate-900/90",
                            isScrolled && "shadow-2xl shadow-[#06113d]/10 dark:shadow-[#e3171e]/20"
                        )}>
                            {/* Logo with gradient */}
                            <Link
                                href="/"
                                className="flex items-center gap-2 shrink-0 z-50 cursor-pointer group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                    <Sparkles className="relative w-6 h-6 text-[#e3171e]" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-[#06113d] via-slate-800 to-[#06113d] dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                                    AtreusPhysio
                                </span>
                            </Link>

                            {/* Desktop Nav with enhanced styling */}
                            <nav className="hidden md:flex items-center gap-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setActiveNav(item.href)}
                                        className="relative px-4 py-2 cursor-pointer group"
                                    >
                                        <span className={cn(
                                            "relative z-10 text-sm font-semibold transition-colors duration-300",
                                            activeNav === item.href
                                                ? "text-[#e3171e]"
                                                : "text-slate-600 dark:text-slate-300 group-hover:text-[#e3171e]"
                                        )}>
                                            {item.name}
                                        </span>
                                        {/* Hover background effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-[#06113d]/5 to-[#e3171e]/5 dark:from-[#06113d]/20 dark:to-[#e3171e]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            layoutId={activeNav === item.href ? "activeNav" : undefined}
                                        />
                                        {/* Active indicator */}
                                        {activeNav === item.href && (
                                            <motion.div
                                                layoutId="activeNavIndicator"
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                ))}
                            </nav>

                            {/* CTA Button & Controls */}
                            <div className="flex items-center gap-3 shrink-0 z-50">
                                {/* Theme Toggle - Hidden on mobile, shown in mobile menu */}
                                <div className="relative hidden md:flex">
                                    <ThemeToggle />
                                </div>

                                {/* Premium Book Now Button */}
                                <motion.button
                                    onClick={() => setIsBookingOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden md:flex relative group cursor-pointer"
                                >
                                    {/* Animated gradient border */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse"></div>

                                    {/* Button content */}
                                    <div className={cn(
                                        "relative px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300",
                                        "bg-gradient-to-r from-[#06113d] to-[#e3171e]",
                                        "text-white shadow-lg",
                                        "hover:shadow-xl hover:shadow-[#e3171e]/50"
                                    )}>
                                        <span className="flex items-center gap-2">
                                            Book Now
                                            <Sparkles className="w-4 h-4 animate-pulse" />
                                        </span>
                                    </div>
                                </motion.button>

                                {/* Mobile Menu Toggle */}
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    whileTap={{ scale: 0.9 }}
                                    className="md:hidden p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                                    aria-label="Toggle menu"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isMobileMenuOpen ? "close" : "open"}
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Premium Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#06113d]/5 to-[#e3171e]/5 dark:from-slate-950 dark:via-[#06113d]/20 dark:to-[#e3171e]/20 backdrop-blur-2xl" />

                        {/* Content */}
                        <div className="relative h-full flex flex-col items-center justify-center p-8">
                            <nav className="flex flex-col items-center gap-6 mb-12">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 100 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="relative group cursor-pointer"
                                        >
                                            <span className="text-4xl font-bold bg-gradient-to-r from-[#06113d] via-slate-800 to-[#06113d] dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent group-hover:scale-110 inline-block transition-transform">
                                                {item.name}
                                            </span>
                                            <motion.div
                                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Socials & Contact */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <div className="flex gap-4">
                                    {[
                                        { icon: "I", href: "#", label: "Instagram" },
                                        { icon: "L", href: "#", label: "LinkedIn" },
                                        { icon: "T", href: "#", label: "Twitter" },
                                        { icon: "F", href: "#", label: "Facebook" },
                                    ].map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer group"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                                            <div className="relative w-full h-full flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-[#06113d] group-hover:to-[#e3171e] transition-all">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors">
                                                    {social.icon}
                                                </span>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>

                                <div className="text-center space-y-1">
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">+91 98765 43210</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">contact@atreusphysio.in</p>
                                </div>
                            </motion.div>

                            {/* Mobile CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8 flex flex-col items-center gap-4"
                            >
                                <ThemeToggle />

                                <motion.button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsBookingOpen(true);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative group cursor-pointer"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                                    <div className="relative px-10 py-4 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full">
                                        <span className="text-lg font-bold text-white flex items-center gap-2">
                                            Book Now
                                            <Sparkles className="w-5 h-5" />
                                        </span>
                                    </div>
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <GlobalBookingDialog isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
