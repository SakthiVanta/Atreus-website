"use client";

import { useEffect, useState } from "react";
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
        <main className="min-h-screen bg-slate-50">

            {/* Hero Section with Gradient & Pattern */}
            <section className="relative py-24 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-900/50"></div>
                <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30">
                        AtreusPhysio Academy
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {data.hero.title}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {data.hero.subtitle}
                    </p>
                    <Button className="bg-white text-slate-900 hover:bg-blue-50 text-lg px-8 py-4 h-auto rounded-full">
                        {data.hero.cta}
                    </Button>
                </div>
            </section>

            {/* Offer Banner */}
            {data.offer?.active && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 py-4 px-4 shadow-lg relative z-10 -mt-8 mx-4 md:mx-auto max-w-5xl rounded-xl transform -rotate-1">
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
                </div>
            )}

            {/* Features Grid */}
            <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {data.features.map((feature: any, i: number) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                <Users className="w-6 h-6" /> {/* Placeholder icon */}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                                <p className="text-sm text-slate-600">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Course List */}
            <section className="pb-24 max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Upcoming Workshops</h2>
                        <p className="text-slate-600">Secure your spot in our next batch.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.courseList.map((course: any) => (
                        <div key={course.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image Placeholder */}
                            <div className="h-48 bg-slate-200 relative">
                                {/* In real app, use Image component here */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {course.tags.map((tag: string) => (
                                        <span key={tag} className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-900">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                            {course.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-slate-500 gap-4">
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                                    <MapPin className="w-4 h-4" /> {course.location}
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-orange-600 font-medium">{course.seatsLeft} seats left</span>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                    <div>
                                        <span className="text-slate-400 text-sm line-through block">{course.originalPrice}</span>
                                        <span className="text-2xl font-bold text-slate-900">{course.price}</span>
                                    </div>
                                    <Button
                                        onClick={() => handleBookNow(course)}
                                        className="bg-slate-900 text-white hover:bg-slate-800"
                                    >
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </div>
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
