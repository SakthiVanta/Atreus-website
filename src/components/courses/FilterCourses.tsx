"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, ChevronUp, X, Check } from "lucide-react";

interface FilterState {
    availability: "all" | "available" | "coming-soon";
    courseType: "all" | "core" | "lecture";
    priceType: "all" | "free" | "paid";
    format: "all" | "online" | "zoom" | "live" | "on-demand";
}

interface FilterCoursesProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function FilterCourses({ filters, setFilters }: FilterCoursesProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Filter Options Data
    const filterOptions = {
        availability: [
            { id: "all", label: "All" },
            { id: "available", label: "Available Now" },
            { id: "coming-soon", label: "Coming Soon" }
        ],
        courseType: [
            { id: "all", label: "All Events" },
            { id: "core", label: "Core Courses" },
            { id: "lecture", label: "Single Day Lectures" }
        ],
        priceType: [
            { id: "all", label: "All Prices" },
            { id: "free", label: "Free" },
            { id: "paid", label: "Paid" }
        ],
        format: [
            { id: "all", label: "All Formats" },
            { id: "online", label: "Online" },
            { id: "zoom", label: "Zoom" },
            { id: "live", label: "Live" },
            { id: "on-demand", label: "On-Demand" }
        ]
    };

    const activeCount = Object.values(filters).filter(v => v !== "all").length;

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8 transition-all duration-300 hover:shadow-md">

            {/* Header / Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isOpen ? 'bg-[#06113d] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                        <Filter className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">Filter Courses</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {activeCount === 0 ? "No active filters" : `${activeCount} active filter${activeCount !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                </div>

                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                </div>
            </button>

            {/* Collapsible Content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                                {/* Availability */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability</label>
                                    <div className="flex flex-col gap-2">
                                        {filterOptions.availability.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setFilters(prev => ({ ...prev, availability: option.id as any }))}
                                                className={`
                                                    flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
                                                    ${filters.availability === option.id
                                                        ? "bg-[#06113d]/5 text-[#06113d] dark:bg-white/10 dark:text-white border border-[#06113d]/20 dark:border-white/20"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:pl-4"
                                                    }
                                                `}
                                            >
                                                <span>{option.label}</span>
                                                {filters.availability === option.id && <Check className="w-3.5 h-3.5" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Course Type */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Type</label>
                                    <div className="flex flex-col gap-2">
                                        {filterOptions.courseType.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setFilters(prev => ({ ...prev, courseType: option.id as any }))}
                                                className={`
                                                    flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
                                                    ${filters.courseType === option.id
                                                        ? "bg-[#06113d]/5 text-[#06113d] dark:bg-white/10 dark:text-white border border-[#06113d]/20 dark:border-white/20"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:pl-4"
                                                    }
                                                `}
                                            >
                                                <span>{option.label}</span>
                                                {filters.courseType === option.id && <Check className="w-3.5 h-3.5" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price</label>
                                    <div className="flex flex-col gap-2">
                                        {filterOptions.priceType.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setFilters(prev => ({ ...prev, priceType: option.id as any }))}
                                                className={`
                                                    flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
                                                    ${filters.priceType === option.id
                                                        ? "bg-[#06113d]/5 text-[#06113d] dark:bg-white/10 dark:text-white border border-[#06113d]/20 dark:border-white/20"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:pl-4"
                                                    }
                                                `}
                                            >
                                                <span>{option.label}</span>
                                                {filters.priceType === option.id && <Check className="w-3.5 h-3.5" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Format */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Format</label>
                                    <div className="flex flex-col gap-2">
                                        {filterOptions.format.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => setFilters(prev => ({ ...prev, format: option.id as any }))}
                                                className={`
                                                    flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all
                                                    ${filters.format === option.id
                                                        ? "bg-[#06113d]/5 text-[#06113d] dark:bg-white/10 dark:text-white border border-[#06113d]/20 dark:border-white/20"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:pl-4"
                                                    }
                                                `}
                                            >
                                                <span>{option.label}</span>
                                                {filters.format === option.id && <Check className="w-3.5 h-3.5" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Footer Actions */}
                            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <button
                                    onClick={() => setFilters({
                                        availability: "all",
                                        courseType: "all",
                                        priceType: "all",
                                        format: "all"
                                    })}
                                    className="text-sm font-medium text-[#e3171e] hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" /> Clear filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
