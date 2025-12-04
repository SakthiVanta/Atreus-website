"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Clock, MapPin, Tag, Users } from "lucide-react";
import { BookNowModal } from "@/components/courses/BookNowModal";

export default function CoursesPage() {
    const [data, setData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    useEffect(() => {
        fetch("/api/page-content?pageId=courses")
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error("Error loading content:", err));
    }, []);

    const handleBookNow = (course: any) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    if (!data) return <div>Loading...</div>;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#06113d] via-[#06113d] to-[#0a1a5c] text-white py-24 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e3171e]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e3171e]/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e3171e]">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            AtreusPhysio Academy
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            {data.hero.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-slate-300 leading-relaxed mb-8"
                        >
                            {data.hero.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Button className="bg-white text-[#06113d] hover:bg-slate-100 text-lg px-8 py-4 h-auto rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                                {data.hero.cta}
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Offer Banner */}
            {data.offer?.active && (
                <motion.div
                    initial={{ opacity: 0, y: -20, rotate: -1 }}
                    animate={{ opacity: 1, y: 0, rotate: -1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 py-4 px-4 shadow-lg relative z-10 -mt-8 mx-4 md:mx-auto max-w-5xl rounded-xl"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between text-slate-900 font-medium">
                        <div className="flex items-center gap-3 mb-2 md:mb-0">
                            <Tag className="w-6 h-6" />
                            <span className="text-lg font-bold">{data.offer.title}</span>
                            <span className="hidden md:inline text-slate-800/80">|</span>
                            <span>{data.offer.description}</span>
                        </div>
                        <div className="bg-white/20 px-4 py-1 rounded-lg border border-white/30 font-mono font-bold">
                            Code: {data.offer.code}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Features Grid */}
            <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {data.features.map((feature: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-start gap-4"
                        >
                            <div className="w-12 h-12 bg-[#06113d]/10 dark:bg-[#06113d]/20 rounded-lg flex items-center justify-center text-[#06113d] dark:text-[#e3171e] shrink-0">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Course List */}
            <section className="pb-24 max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Upcoming Workshops</h2>
                        <p className="text-slate-600 dark:text-slate-300">Secure your spot in our next batch.</p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.courseList.map((course: any, index: number) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Placeholder */}
                            <div className="h-48 bg-gradient-to-br from-[#06113d] to-[#0a1a5c] relative">
                                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {course.tags.map((tag: string) => (
                                        <span key={tag} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-900 dark:text-white">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#e3171e] transition-colors">
                                            {course.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 gap-4">
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                                    <MapPin className="w-4 h-4" /> {course.location}
                                    <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                                    <span className="text-[#e3171e] font-medium">{course.seatsLeft} seats left</span>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                                    <div>
                                        <span className="text-slate-400 dark:text-slate-500 text-sm line-through block">{course.originalPrice}</span>
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{course.price}</span>
                                    </div>
                                    <Button
                                        onClick={() => handleBookNow(course)}
                                        className="bg-[#06113d] hover:bg-[#e3171e] text-white transition-colors"
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Book Now Modal */}
            <BookNowModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courseTitle={selectedCourse?.title || ""}
                coursePrice={selectedCourse?.price || ""}
            />
        </main>
    );
}
