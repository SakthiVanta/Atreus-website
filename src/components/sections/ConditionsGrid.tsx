"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
    const displayedConditions = conditions.slice(0, 3);

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeader
                    title="Conditions We Treat"
                    description="Comprehensive care for a wide range of musculoskeletal issues."
                    linkText="View All Conditions"
                    linkHref="/about"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {displayedConditions.map((condition, index) => (
                            <motion.div
                                key={condition.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card variant="default" hover className="p-6 group will-change-transform h-full">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-between">
                                        {condition.title}
                                        <ChevronRight className="w-5 h-5 text-[#e3171e] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-[#06113d] dark:text-[#e3171e] uppercase tracking-wider mb-1">What it is</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{condition.whatItIs}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold text-[#06113d] dark:text-[#e3171e] uppercase tracking-wider mb-1">Common Symptoms</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{condition.symptoms}</p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                                            <h4 className="text-xs font-bold text-[#e3171e] uppercase tracking-wider mb-1">When to seek help</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">{condition.whenToSeekHelp}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
