"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface GlobalBookingDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function GlobalBookingDialog({ isOpen, onClose }: GlobalBookingDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        const loadingToast = toast.loading({
            title: "Sending your request...",
            description: "Please wait while we process your booking."
        });

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...data,
                    type: "general",
                    page: "Global Booking Dialog",
                    timestamp: new Date().toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                        timeZone: 'Asia/Kolkata'
                    })
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to submit");
            }

            toast.dismiss(loadingToast);
            toast.success({
                title: "Booking Request Received!",
                description: `We'll contact you shortly at ${data.phone}`,
            });

            reset();
            onClose();
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error({
                title: "Booking Failed",
                description: error.message || "Please check your information and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    // Use pure component for portal to avoid hydration issues
    const PortalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-[100] w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
                        style={{ left: "50%", top: "15%", x: "-50%", y: "-50%" }}
                    >
                        {/* Header */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Book an Appointment</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Fill in your details below</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                    <input
                                        {...register("name")}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address (Optional)</label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                                    <input
                                        {...register("phone")}
                                        type="tel"
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="+91 98765 43***"
                                    />
                                    {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message (Optional)</label>
                                    <textarea
                                        {...register("message")}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all min-h-[80px] placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        placeholder="Tell us about your condition..."
                                    />
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                Book Now <ChevronRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(PortalContent, document.body);
}
