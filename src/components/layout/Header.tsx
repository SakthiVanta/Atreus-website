"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Instagram, Linkedin, Phone, Mail } from "lucide-react";

import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Contact Information
const contactInfo = {
    phone: "+91 7010294784",
    email: "contact@atreusphysio.com",
    social: {
        instagram: "https://www.instagram.com/atreus_physio",
        linkedin: "https://www.linkedin.com/in/swatheeshwaran-mpt-sports-018566274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    }
};

export function Header() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

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
        { name: "Podcasts", href: "/podcasts" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 px-2 md:pt-4 md:px-4 pointer-events-none">
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
                            "flex items-center justify-between px-4 py-2 md:px-6 md:py-3.5 rounded-full backdrop-blur-xl transition-all duration-500",
                            "bg-white/90 dark:bg-slate-900/90",
                            isScrolled && "shadow-2xl shadow-[#06113d]/10 dark:shadow-[#e3171e]/20"
                        )}>
                            <Link
                                href="/"
                                className="flex items-center shrink-0 z-50 cursor-pointer group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Image
                                    src="/images/logo.webp"
                                    alt="AtreusPhysio Logo"
                                    width={180}
                                    height={130}
                                    className="h-10 md:h-16 w-auto object-contain dark:bg-white dark:px-2 dark:py-1 dark:rounded-full"
                                    priority
                                />
                            </Link>

                            {/* Desktop Nav with enhanced styling */}
                            <nav className="hidden lg:flex items-center gap-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/');

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="relative px-4 py-2 cursor-pointer group"
                                        >
                                            <span className={cn(
                                                "relative z-10 text-sm font-semibold transition-colors duration-300",
                                                isActive
                                                    ? "text-[#e3171e]"
                                                    : "text-slate-600 dark:text-slate-300 group-hover:text-[#e3171e]"
                                            )}>
                                                {item.name}
                                            </span>

                                            {/* Active Background - Persists */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNavBackground"
                                                    className="absolute inset-0 bg-gradient-to-r from-[#06113d]/10 to-[#e3171e]/10 dark:from-[#06113d]/30 dark:to-[#e3171e]/30 rounded-full"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}

                                            {/* Hover Background - Only when NOT active */}
                                            {!isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#06113d]/5 to-[#e3171e]/5 dark:from-[#06113d]/20 dark:to-[#e3171e]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            )}

                                            {/* Active Indicator Dot */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNavIndicator"
                                                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* CTA Button & Controls */}
                            <div className="flex items-center gap-3 shrink-0 z-50">
                                {/* Theme Toggle - Hidden on mobile, shown in mobile menu */}
                                <div className="relative hidden lg:flex">
                                    <ThemeToggle />
                                </div>

                                {/* Premium Book Now Button */}
                                <motion.button
                                    onClick={() => setIsBookingOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden lg:flex relative group cursor-pointer"
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
                                        </span>
                                    </div>
                                </motion.button>

                                {/* Mobile Menu Toggle */}
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    whileTap={{ scale: 0.9 }}
                                    className="lg:hidden p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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

                        {/* Content - Scrollable */}
                        <div className="relative h-full overflow-y-auto overflow-x-hidden">
                            <div className="min-h-full flex flex-col items-center p-8 pt-32 pb-24">
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
                                            { icon: Instagram, href: contactInfo.social.instagram, label: "Instagram" },
                                            { icon: Linkedin, href: contactInfo.social.linkedin, label: "LinkedIn" },
                                        ].map((social, i) => (
                                            <motion.a
                                                key={i}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer group"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                                                <div className="relative w-full h-full flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-[#06113d] group-hover:to-[#e3171e] transition-all">
                                                    <social.icon className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-white transition-colors" />
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>

                                    <div className="text-center space-y-1">
                                        <a href={`tel:${contactInfo.phone}`} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#e3171e] transition-colors flex items-center justify-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            {contactInfo.phone}
                                        </a>
                                        <a href={`mailto:${contactInfo.email}`} className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-[#e3171e] transition-colors flex items-center justify-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {contactInfo.email}
                                        </a>
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
                                            </span>
                                        </div>
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <GlobalBookingDialog isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
