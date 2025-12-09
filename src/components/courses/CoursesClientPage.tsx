"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
    Clock, MapPin, Tag, Users, MoreVertical, ChevronDown, ChevronUp,
    BookOpen, Target, Brain, Sparkles, Bell, Calendar, X, CheckCircle2, Filter
} from "lucide-react";
import { BookNowModal } from "@/components/courses/BookNowModal";
import { EnquiryModal } from "@/components/courses/EnquiryModal";
import { FilterCourses } from "@/components/courses/FilterCourses";

// Helper to determine course status
const getCourseStatus = (course: any) => {
    if (course.tags.includes("Coming Soon") || course.date === "Coming Soon") return "coming-soon";
    if (course.seatsLeft === 0) return "sold-out";
    return "available";
};

// Helper to get course format
const getCourseFormat = (course: any) => {
    if (course.date?.includes("On-Demand")) return "on-demand";
    if (course.location === "Zoom") return "zoom";
    if (course.date?.includes("Live:")) return "live";
    return "online";
};

// Helper to determine if course is paid
const getCoursePriceType = (course: any) => {
    if (course.price === "Free" || course.price === "₹0") return "free";
    if (course.price === "TBA" || course.price === "") return "tba";
    return "paid";
};

export function CoursesClientPage({ data }: { data: any }) {
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

    // Multiple filter states
    const [filters, setFilters] = useState({
        availability: "all" as "all" | "available" | "coming-soon",
        courseType: "all" as "all" | "core" | "lecture",
        priceType: "all" as "all" | "free" | "paid",
        format: "all" as "all" | "online" | "zoom" | "live" | "on-demand"
    });

    // Filter Logic with multiple criteria
    const filteredCourses = useMemo(() => {
        return data.courseList.filter((course: any) => {
            const status = getCourseStatus(course);
            const format = getCourseFormat(course);
            const priceType = getCoursePriceType(course);

            // Availability filter
            if (filters.availability === "available" && status !== "available") return false;
            if (filters.availability === "coming-soon" && status !== "coming-soon") return false;

            // Course type filter
            if (filters.courseType === "core" && !course.tags.includes("Core Course")) return false;
            if (filters.courseType === "lecture" && !course.tags.includes("Single Day Lecture")) return false;

            // Price filter
            if (filters.priceType === "free" && priceType !== "free") return false;
            if (filters.priceType === "paid" && priceType !== "paid") return false;

            // Format filter
            if (filters.format !== "all" && format !== filters.format) return false;

            return true;
        });
    }, [data.courseList, filters]);

    // Separate courses into available and coming soon
    const availableCourses = filteredCourses.filter((course: any) => getCourseStatus(course) === "available");
    const comingSoonCourses = filteredCourses.filter((course: any) => getCourseStatus(course) === "coming-soon");

    const handleAction = (course: any, status: string) => {
        setSelectedCourse(course);
        if (status === "coming-soon") {
            setIsEnquiryModalOpen(true);
        } else {
            setIsBookModalOpen(true);
        }
    };

    const toggleCourseDetails = (courseId: string) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    // Check if any filters are active
    const hasActiveFilters = filters.availability !== "all" || filters.courseType !== "all" ||
        filters.priceType !== "all" || filters.format !== "all";

    // Clear all filters
    const clearAllFilters = () => {
        setFilters({
            availability: "all",
            courseType: "all",
            priceType: "all",
            format: "all"
        });
    };

    // Get active filter chips
    const getActiveFilterChips = () => {
        const chips = [];
        if (filters.availability !== "all") chips.push({ key: "availability", label: filters.availability === "available" ? "Available Now" : "Coming Soon" });
        if (filters.courseType !== "all") chips.push({ key: "courseType", label: filters.courseType === "core" ? "Core Courses" : "Lectures" });
        if (filters.priceType !== "all") chips.push({ key: "priceType", label: filters.priceType === "free" ? "Free" : "Paid" });
        if (filters.format !== "all") chips.push({ key: "format", label: filters.format.charAt(0).toUpperCase() + filters.format.slice(1) });
        return chips;
    };

    const removeFilter = (filterKey: string) => {
        setFilters(prev => ({ ...prev, [filterKey]: "all" }));
    };

    const scrollToCourses = () => {
        const coursesSection = document.getElementById('courses-list');
        if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!data) return <div>Loading...</div>;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

            {/* Hero Section */}
            <section className="relative bg-[#06113d] text-white py-32 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e3171e]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center flex flex-col items-center">

                    {/* Atreus Academy Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6"
                    >
                        <BookOpen className="w-4 h-4 text-[#e3171e]" />
                        <span className="text-xs font-medium tracking-wide uppercase text-slate-200">Atreus Academy</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
                    >
                        AtreusPhysio Academy
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Elevate your practice with expert-led courses. Deep dive into clinical reasoning and evidence-based practice.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button
                            onClick={scrollToCourses}
                            className="bg-white hover:bg-slate-100 text-[#e3171e] px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-slate-300/20 transition-all flex items-center gap-2 group
                                       dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:hover:shadow-slate-600/20"
                        >
                            Explore Courses
                            <ChevronDown className="w-5 h-5 text-[#e3171e] group-hover:translate-y-1 transition-transform dark:text-white" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid (Preserved) */}
            <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {data.features.map((feature: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-[#06113d] dark:text-[#e3171e]">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Course Section */}
            <section id="courses-list" className="py-20 max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Academy Schedule</h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Explore our upcoming workshops and webinars.</p>
                </div>

                {/* Filters Section */}
                <FilterCourses filters={filters} setFilters={setFilters} />

                {/* Active Filter Chips */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Filters:</span>
                        {getActiveFilterChips().map((chip) => (
                            <span
                                key={chip.key}
                                className="inline-flex items-center gap-1.5 bg-[#06113d] text-white px-3 py-1.5 rounded-full text-xs font-medium"
                            >
                                {chip.label}
                                <button
                                    onClick={() => removeFilter(chip.key)}
                                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                        <button
                            onClick={clearAllFilters}
                            className="text-xs font-medium text-[#e3171e] hover:underline"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Showing <strong className="text-slate-900 dark:text-white">{filteredCourses.length}</strong> course{filteredCourses.length !== 1 ? 's' : ''}
                        {availableCourses.length > 0 && comingSoonCourses.length > 0 && (
                            <> (<strong>{availableCourses.length}</strong> available, <strong>{comingSoonCourses.length}</strong> coming soon)</>
                        )}
                    </p>
                </div>

                {/* Available Now Section */}
                {availableCourses.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Available Now</h3>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                                {availableCourses.length} Course{availableCourses.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <CourseGrid
                            courses={availableCourses}
                            expandedCourse={expandedCourse}
                            toggleCourseDetails={toggleCourseDetails}
                            handleAction={handleAction}
                        />
                    </div>
                )}

                {/* Coming Soon Section */}
                {comingSoonCourses.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-6 h-6 text-yellow-500" />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Coming Soon</h3>
                            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                                {comingSoonCourses.length} Course{comingSoonCourses.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <CourseGrid
                            courses={comingSoonCourses}
                            expandedCourse={expandedCourse}
                            toggleCourseDetails={toggleCourseDetails}
                            handleAction={handleAction}
                        />
                    </div>
                )}

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium mb-2">No courses found</p>
                        <p className="text-sm">Try adjusting your filters to see more results</p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="mt-4 text-[#e3171e] hover:underline font-medium"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                )}
            </section>

            {/* Modals */}
            <BookNowModal
                isOpen={isBookModalOpen}
                onClose={() => setIsBookModalOpen(false)}
                courseTitle={selectedCourse?.title || ""}
                coursePrice={selectedCourse?.price || ""}
            />

            <EnquiryModal
                isOpen={isEnquiryModalOpen}
                onClose={() => setIsEnquiryModalOpen(false)}
                courseTitle={selectedCourse?.title || ""}
            />
        </main>
    );
}

// Course Grid Component
function CourseGrid({
    courses,
    expandedCourse,
    toggleCourseDetails,
    handleAction
}: {
    courses: any[],
    expandedCourse: string | null,
    toggleCourseDetails: (id: string) => void,
    handleAction: (course: any, status: string) => void
}) {
    return (
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
                {courses.map((course: any) => {
                    const status = getCourseStatus(course);
                    const isComingSoon = status === "coming-soon";

                    return (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={course.id}
                            className={`
                                group relative rounded-2xl overflow-hidden transition-all duration-300
                                ${isComingSoon
                                    ? "bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700"
                                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1"
                                }
                            `}
                        >
                            {/* Card Header / Image Area */}
                            <div className={`h-48 relative ${isComingSoon ? "bg-slate-200 dark:bg-slate-800 grayscale opacity-80" : "bg-gradient-to-br from-[#06113d] to-[#0a1a5c]"}`}>
                                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    {isComingSoon ? (
                                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                                            <Clock className="w-3 h-3" /> Coming Soon
                                        </span>
                                    ) : (
                                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            Open for Booking
                                        </span>
                                    )}
                                </div>

                                <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-20">
                                    {course.tags.map((tag: string) => (
                                        <span key={tag} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-slate-900 dark:text-white uppercase tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                <h3 className={`text-xl font-bold mb-2 ${isComingSoon ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-white"}`}>
                                    {course.title}
                                </h3>

                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-[#e3171e]" />
                                        <span className={isComingSoon ? "italic" : "font-medium"}>{course.date}</span>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2 min-h-[40px]">
                                    {course.description}
                                </p>

                                {/* Expandable Details */}
                                <div className="mb-6">
                                    <button
                                        onClick={() => toggleCourseDetails(course.id)}
                                        className={`
                                            w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider py-2 border-y 
                                            ${isComingSoon ? "border-slate-200 text-slate-400" : "border-slate-100 dark:border-slate-700 text-[#06113d] dark:text-[#e3171e] hover:bg-slate-50 dark:hover:bg-slate-700/50"}
                                            transition-colors
                                        `}
                                    >
                                        <span>View Syllabus & Details</span>
                                        {expandedCourse === course.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: expandedCourse === course.id ? 'auto' : 0, opacity: expandedCourse === course.id ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 pb-2 space-y-4">
                                            {course.details?.topics && (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-900 dark:text-white">
                                                        <BookOpen className="w-3 h-3" /> TOPICS
                                                    </div>
                                                    <ul className="grid grid-cols-1 gap-1">
                                                        {course.details.topics.slice(0, 4).map((t: string, i: number) => (
                                                            <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                                                                <span className="w-1 h-1 bg-slate-300 rounded-full mt-1.5 shrink-0" /> {t}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {isComingSoon && (
                                                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded border border-yellow-100 dark:border-yellow-900/20 text-xs text-yellow-700 dark:text-yellow-500">
                                                    Detailed syllabus available upon enquiry.
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Action Area */}
                                <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <div>
                                        {isComingSoon ? (
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-400 uppercase font-bold">Price</span>
                                                <span className="text-xl font-bold text-slate-400">TBA</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col">
                                                {course.originalPrice && (
                                                    <span className="text-xs text-slate-400 line-through">{course.originalPrice}</span>
                                                )}
                                                <span className="text-2xl font-bold text-[#06113d] dark:text-white">{course.price}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        onClick={() => handleAction(course, status)}
                                        className={`
                                            h-auto py-2.5 px-6 rounded-xl font-semibold transition-all shadow-md
                                            ${isComingSoon
                                                ? "bg-white border-2 border-slate-200 text-slate-600 hover:border-[#06113d] hover:text-[#06113d]"
                                                : "bg-[#06113d] hover:bg-[#e3171e] text-white hover:shadow-lg hover:shadow-red-500/20"
                                            }
                                        `}
                                    >
                                        {isComingSoon ? (
                                            <span className="flex items-center gap-2"><Bell className="w-4 h-4" /> Notify Me</span>
                                        ) : (
                                            "Book Seat"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </motion.div>
    );
}