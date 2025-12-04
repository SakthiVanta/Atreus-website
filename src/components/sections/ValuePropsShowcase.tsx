"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, Activity, Target, Zap, TrendingUp, Users } from "lucide-react";

interface ValueProp {
    id: string;
    title: string;
    desc: string;
}

interface ValuePropsShowcaseProps {
    valueProps: ValueProp[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    assessment: Target,
    "patient-centred": Users,
    science: Activity,
    evidence: CheckCircle2,
    progressive: TrendingUp,
    biomechanics: Zap,
};

export function ValuePropsShowcase({ valueProps }: ValuePropsShowcaseProps) {
    const [showAll, setShowAll] = useState(false);
    const displayedProps = showAll ? valueProps : valueProps.slice(0, 3);

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-left mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        What Makes ATREUS PHYSIO Different
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#06113d] to-[#e3171e] rounded-full mb-6"></div>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
                        Combining clinical expertise with patient education for lasting results. We believe in a science-driven, assessment-first approach that puts you in control of your recovery.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayedProps.map((prop, index) => {
                            const Icon = iconMap[prop.id] || CheckCircle2;
                            return (
                                <motion.div
                                    key={prop.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: showAll ? 0 : index * 0.1,
                                        layout: { duration: 0.3 }
                                    }}
                                >
                                    <Card variant="default" hover className="h-full p-8 group">
                                        <div className="flex flex-col h-full">
                                            <div className="w-14 h-14 bg-[#06113d]/10 dark:bg-[#e3171e]/20 rounded-xl mb-6 flex items-center justify-center text-[#06113d] dark:text-[#e3171e] group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:text-[#e3171e] transition-colors">
                                                {prop.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                                                {prop.desc}
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {valueProps.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-[#e3171e] transition-all group shadow-sm hover:shadow-md"
                        >
                            {showAll ? "Show Less" : "Show More"}
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                animate={{ rotate: showAll ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
