"use client";


import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Condition } from "@/data/conditions";

interface ConditionCardProps {
    condition: Condition;
    /**
     * If true, card starts collapsed and can be toggled.
     * If false, card is fully visible (static).
     */
    collapsible?: boolean;
    isOpen?: boolean;
    onToggle?: () => void;
}

export function ConditionCard({ condition, collapsible = true, isOpen = false, onToggle }: ConditionCardProps) {
    // If not collapsible, title isn't a button.
    // If collapsible, utilize the onToggle callback passed from parent

    return (
        <Card variant="default" hover className={`overflow-hidden transition-all duration-300 group hover:shadow-lg dark:hover:shadow-slate-800/50 flex flex-col ${!collapsible ? 'h-full' : ''}`}>
            {/* Header */}
            {collapsible ? (
                <div
                    className="p-6 flex items-center justify-between cursor-pointer"
                    onClick={onToggle}
                >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#e3171e] transition-colors">
                        {condition.title}
                    </h3>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-[#e3171e]/10 group-hover:text-[#e3171e] transition-colors"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.div>
                </div>
            ) : (
                <Link
                    href={`/conditions/${condition.slug}`}
                    className="p-6 flex items-center justify-between block"
                >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#e3171e] transition-colors">
                        {condition.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#e3171e] transition-colors" />
                </Link>
            )}

            {/* Content Body */}
            <AnimatePresence>
                {(isOpen || !collapsible) && (
                    <motion.div
                        initial={collapsible ? { height: 0, opacity: 0 } : false}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className={`px-6 pb-6 pt-0 space-y-5 border-t border-slate-100 dark:border-slate-800 mt-2 ${!collapsible ? 'border-none mt-0 pt-2' : ''}`}>
                            {/* Spacer if collapsible */}
                            {collapsible && <div className="h-2"></div>}

                            {/* What it is */}
                            <div>
                                <h4 className="text-xs font-bold text-[#06113d] dark:text-[#e3171e] uppercase tracking-wider mb-2">
                                    What it is
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                                    {condition.summary.whatItIs}
                                </p>
                            </div>

                            {/* Symptoms */}
                            <div>
                                <h4 className="text-xs font-bold text-[#06113d] dark:text-[#e3171e] uppercase tracking-wider mb-2">
                                    Common Symptoms
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                    {condition.summary.symptoms}
                                </p>
                            </div>

                            {/* Action Area */}
                            <div className="pt-4 flex justify-end">
                                <Link
                                    href={`/conditions/${condition.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#e3171e] hover:underline underline-offset-4 group/link"
                                >
                                    Read Full Article
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
