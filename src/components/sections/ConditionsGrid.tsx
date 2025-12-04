"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Condition {
    id: string;
    title: string;
    whatItIs: string;
    symptoms: string;
    whenToSeekHelp: string;
}

interface ConditionsGridProps {
    conditions: Condition[];
}

export function ConditionsGrid({ conditions }: ConditionsGridProps) {
    const displayedConditions = conditions.slice(0, 4);

    return (
        <section className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Conditions We Treat
                    </h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                        Comprehensive care for a wide range of musculoskeletal issues.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <AnimatePresence mode="popLayout">
                        {displayedConditions.map((condition, index) => (
                            <motion.div
                                key={condition.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100 group will-change-transform"
                            >
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center justify-between">
                                    {condition.title}
                                    <ChevronRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">What it is</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">{condition.whatItIs}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Common Symptoms</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">{condition.symptoms}</p>
                                    </div>

                                    <div className="pt-3 border-t border-slate-50">
                                        <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">When to seek help</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed italic">{condition.whenToSeekHelp}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="text-center">
                    <a
                        href="/about"
                        className="inline-flex items-center justify-center px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 hover:border-blue-300 transition-all group"
                    >
                        View All Conditions
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
