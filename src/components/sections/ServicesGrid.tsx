"use client";

import { ImageOptim } from "@/components/ui/ImageOptim";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

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

export function ServicesGrid({ services, limit }: { services: Service[]; limit?: number }) {
    const displayedServices = limit ? services.slice(0, limit) : services;

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeader
                    title="Our Services"
                    description="Comprehensive care tailored to your specific recovery needs."
                    linkText="View All Services"
                    linkHref="/services"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayedServices.map((service) => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
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
            </div>
        </section>
    );
}
