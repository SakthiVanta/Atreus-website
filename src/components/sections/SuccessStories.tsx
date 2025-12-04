"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Snapshot {
    id: string;
    title: string;
    description: string;
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
            <div ref={ref} className="relative">
                <motion.div
                    className="flex gap-6"
                    animate={controls}
                    style={{ width: "fit-content" }}
                >
                    {allSnapshots.map((snapshot, index) => (
                        <div
                            key={`${snapshot.id}-${index}`}
                            className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl flex-shrink-0"
                            style={{ width: "350px" }}
                        >
                            <img
                                src={snapshot.image}
                                alt={snapshot.title}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold mb-2 text-white">
                                    {snapshot.title}
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {snapshot.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
