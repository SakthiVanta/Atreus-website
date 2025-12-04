"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

import { GlobalBookingDialog } from "@/components/ui/GlobalBookingDialog";

export function FloatingCTA() {
    const [showBooking, setShowBooking] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
                {/* WhatsApp Button - Always Visible */}
                <a
                    href="https://wa.me/919876543210" // Replace with actual number
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle size={28} fill="white" />
                </a>

                {/* Floating Booking Banner */}
                <AnimatePresence>
                    {showBooking && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="pointer-events-auto relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <div className="relative flex items-center bg-white rounded-full p-1 pr-4 shadow-2xl border border-slate-100">
                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="flex items-center gap-3 pl-1 pr-2 py-1"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-bold text-slate-900 leading-tight">
                                            Book Appointment
                                        </span>
                                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                                            Limited Slots
                                        </span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setShowBooking(false)}
                                    className="ml-2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <GlobalBookingDialog isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
