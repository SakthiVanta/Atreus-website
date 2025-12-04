"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Check, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type FormData = z.infer<typeof formSchema>;

interface BookNowModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
    coursePrice: string;
}

export function BookNowModal({ isOpen, onClose, courseTitle, coursePrice }: BookNowModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, courseTitle, coursePrice, type: "course" }),
            });

            if (!response.ok) throw new Error("Failed to submit");

            setIsSuccess(true);
            reset();
        } catch (error) {
            console.error("Error booking course:", error);
            // You might want to show an error toast here
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                        style={{ left: "50%", top: "20%", x: "-50%", y: "-50%" }}
                    >
                        {/* Header */}
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Secure Your Spot</h3>
                                <p className="text-sm text-slate-500">{courseTitle}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200/50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h4>
                                        <p className="text-slate-600 mb-6">
                                            We've received your details. Check your email for the payment link and invoice.
                                        </p>
                                        <Button onClick={onClose} className="w-full bg-slate-900 text-white hover:bg-slate-800">
                                            Close
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-4"
                                    >
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                                            <input
                                                {...register("name")}
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                            <input
                                                {...register("phone")}
                                                type="tel"
                                                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                                        </div>

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Proceed to Payment <ChevronRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </Button>
                                            <p className="text-xs text-center text-slate-400 mt-3">
                                                Secure payment link will be sent to your email.
                                            </p>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
