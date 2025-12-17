"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Snapshot {
    id: string;
    slug: string;
    title: string;
    short_description: string;
    image: string;
}

interface SuccessStoriesProps {
    data: {
        snapshots: Snapshot[];
        testimonials?: any[];
    };
}

export function SuccessStories({ data }: SuccessStoriesProps) {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    // Create duplicated array for infinite scroll effect
    const allSnapshots = [...data.snapshots, ...data.snapshots, ...data.snapshots];

    useEffect(() => {
        if (isInView) {
            controls.start({
                x: [0, -100 * data.snapshots.length],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                },
            });
        }
    }, [isInView, controls, data.snapshots.length]);

    return (
        <section className="py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#06113d] rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#e3171e] rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                        Success Stories
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-[#06113d] to-[#e3171e] mx-auto rounded-full"></div>
                    <p className="mt-6 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
                        Real people, real recovery. See how we help our patients get back to what they love.
                    </p>
                </motion.div>
            </div>

            {/* Infinite Scroll Container */}
            <div ref={ref} className="relative mb-16">
                <motion.div
                    className="flex gap-6"
                    animate={controls}
                    style={{ width: "fit-content" }}
                >
                    {allSnapshots.map((snapshot, index) => (
                        <div
                            key={`${snapshot.id}-${index}`}
                            className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl flex-shrink-0 group bg-slate-900"
                            style={{ width: "350px" }}
                        >
                            <img
                                src={snapshot.image}
                                alt={snapshot.title}
                                className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold mb-2 text-white">
                                    {snapshot.title}
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {snapshot.short_description}
                                </p>
                                <Link
                                    href={`/success-stories/${snapshot.slug}`}
                                    className="inline-flex items-center text-white text-sm font-semibold hover:text-[#e3171e] transition-colors"
                                >
                                    Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* View All Button */}
            <div className="flex justify-center relative z-10 text-center">
                <Link
                    href="/success-stories"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#e3171e] border border-transparent rounded-full hover:bg-[#c4121b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e3171e] shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    View All Success Stories
                </Link>
            </div>
        </section>
    );
}
