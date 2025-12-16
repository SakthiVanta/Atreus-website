"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ConditionCard } from "@/components/conditions/ConditionCard";
import { conditions } from "@/data/conditions"; // Direct import from data source

export function ConditionsGrid() {
    // Show top 6 conditions on homepage
    const displayedConditions = conditions.slice(0, 6);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeader
                    title="Conditions We Treat"
                    description="Comprehensive care for a wide range of musculoskeletal issues. We focus on finding the root cause, not just treating symptoms."
                    linkText="View All Conditions"
                    linkHref="/conditions"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12 items-start">
                    <AnimatePresence mode="popLayout">
                        {displayedConditions.map((condition, index) => (
                            <motion.div
                                key={condition.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <ConditionCard
                                    condition={condition}
                                    collapsible={true}
                                    isOpen={expandedId === condition.id}
                                    onToggle={() => handleToggle(condition.id)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
