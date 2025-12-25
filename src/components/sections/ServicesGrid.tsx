"use client";

import { useState } from "react";
import { ImageOptim } from "@/components/ui/ImageOptim";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ChevronDown } from "lucide-react";

type Service = {
    id: string;
    slug?: string;
    title: string;
    excerpt: string;
    image: {
        src: string;
        alt: string;
    };
};

interface ServicesGridProps {
    services: Service[];
    limit?: number;
    showHeader?: boolean;
    initialDisplayCount?: number;
}

export function ServicesGrid({
    services,
    limit,
    showHeader = true,
    initialDisplayCount = 6
}: ServicesGridProps) {
    const [displayCount, setDisplayCount] = useState(limit || initialDisplayCount);

    // If limit is provided, we don't show pagination
    const hasMore = !limit && displayCount < services.length;
    const displayedServices = services.slice(0, displayCount);

    const loadMore = () => {
        setDisplayCount(prev => Math.min(prev + initialDisplayCount, services.length));
    };

    return (
        <section className={`${showHeader ? 'py-20' : 'py-10'} bg-white dark:bg-slate-900`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {showHeader && (
                    <SectionHeader
                        title="Our Services"
                        description="Comprehensive care tailored to your specific recovery needs."
                        linkText="View All Services"
                        linkHref="/services"
                    />
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayedServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.4,
                                    delay: (index % initialDisplayCount) * 0.1
                                }}
                            >
                                <Link
                                    href={`/services/${service.slug || service.id}`}
                                    className="group block bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full border border-slate-200 dark:border-slate-700"
                                >
                                    <div className="aspect-[4/3] relative">
                                        <ImageOptim
                                            src={service.image.src}
                                            alt={service.image.alt}
                                            width={500}
                                            height={500}
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-[#e3171e] transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {service.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {hasMore && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={loadMore}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e3171e] text-white rounded-full font-bold hover:bg-[#06113d] transition-colors group shadow-lg hover:shadow-xl"
                        >
                            Load More Services
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
