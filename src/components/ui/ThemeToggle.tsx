"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    // Don't render until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
            <div className="w-16 h-9 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
        );
    }

    const isDark = theme === "dark";

    return (
        <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center w-16 h-9 rounded-full bg-slate-200 dark:bg-slate-700 p-1 transition-all duration-300 hover:shadow-lg cursor-pointer group"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {/* Sliding indicator */}
            <motion.div
                layout
                className="absolute w-7 h-7 rounded-full bg-white dark:bg-slate-900 shadow-md"
                animate={{
                    x: isDark ? 28 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            />

            {/* Icons */}
            <div className="relative w-full h-full flex items-center justify-between px-1">
                <AnimatePresence mode="wait">
                    {!isDark ? (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <Sun className="w-4 h-4 text-[#e3171e]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun-inactive"
                            className="relative z-0"
                        >
                            <Sun className="w-4 h-4 text-slate-400 opacity-50" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <Moon className="w-4 h-4 text-[#06113d]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon-inactive"
                            className="relative z-0"
                        >
                            <Moon className="w-4 h-4 text-slate-400 opacity-50" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
}
