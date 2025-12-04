"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Snapshot {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface Testimonial {
    id: string;
    name: string;
    text: string;
    role?: string;
}

interface SuccessStoriesProps {
    data: {
        snapshots: Snapshot[];
        testimonials: Testimonial[];
    };
}

export function SuccessStories({ data }: SuccessStoriesProps) {
    const displayedSnapshots = data.snapshots.slice(0, 3);
    const displayedTestimonials = data.testimonials.slice(0, 3);

    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Success Stories
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg">
                        Real people, real recovery. See how we help our patients get back to what they love.
                    </p>
                </motion.div>

                {/* Snapshots Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {displayedSnapshots.map((snapshot, index) => (
                        <motion.div
                            key={snapshot.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl"
                        >
                            <img
                                src={snapshot.image}
                                alt={snapshot.title}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                    {snapshot.title}
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {snapshot.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {displayedTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors"
                        >
                            <Quote className="w-10 h-10 text-blue-500 mb-6 opacity-50" />
                            <p className="text-lg text-slate-300 mb-6 italic leading-relaxed">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white">{testimonial.name}</div>
                                    {testimonial.role && (
                                        <div className="text-sm text-blue-400">{testimonial.role}</div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <a
                        href="/about"
                        className="inline-flex items-center justify-center px-8 py-3 bg-slate-800 text-white border border-slate-700 rounded-xl font-medium hover:bg-slate-700 hover:border-blue-500 transition-all group"
                    >
                        View All Success Stories
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
