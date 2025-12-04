"use client";

import { ImageOptim } from "@/components/ui/ImageOptim";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Service = {
    id: string;
    title: string;
    excerpt: string;
    image: {
        src: string;
        alt: string;
    };
};

export function ServicesGrid({ services }: { services: Service[] }) {
    const displayedServices = services.slice(0, 3);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Our Services
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Comprehensive care tailored to your specific recovery needs.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                                    href={`/services/${service.id}`}
                                    className="group block bg-slate-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full"
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
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-600">
                                            {service.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="text-center">
                    <Link
                        href="/about"
                        className="inline-flex items-center justify-center px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 hover:border-blue-300 transition-all group"
                    >
                        View All Services
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
