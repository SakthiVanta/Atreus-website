"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
    title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {title}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#06113d] to-[#e3171e] mx-auto rounded-full"></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex-1">
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5 text-[#e3171e]" />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 pt-2">
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
