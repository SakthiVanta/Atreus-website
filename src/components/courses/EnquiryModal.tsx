// components/courses/EnquiryModal.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Bell, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle: string;
}

export function EnquiryModal({ isOpen, onClose, courseTitle }: EnquiryModalProps) {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your API call here
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6">
                    {!submitted ? (
                        <>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Get Notified</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">For {courseTitle}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300">Full Name</Label>
                                    <Input
                                        placeholder="Enter your name"
                                        required
                                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300">Email Address</Label>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300">I am interested in:</Label>
                                    <select className="w-full p-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#06113d]/20 dark:focus:ring-white/20">
                                        <option>Course Dates & Schedule</option>
                                        <option>Course Materials / Syllabus</option>
                                        <option>Group Booking</option>
                                        <option>Just let me know when it starts</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-700 dark:text-slate-300">Questions (Optional)</Label>
                                    <Textarea
                                        placeholder="Any specific questions about this course?"
                                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    />
                                </div>

                                <Button type="submit" className="w-full mt-2 font-semibold">
                                    Notify Me When Available
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">You're on the list!</h3>
                            <p className="text-slate-500 dark:text-slate-400">We will update you as soon as this course goes live.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}