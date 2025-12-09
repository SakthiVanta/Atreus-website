import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { generateStandardMetadata } from "@/lib/seo-utils";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { Calendar, Users, Clock, CheckCircle, Star, BookOpen, Target, Award } from "lucide-react";

type Props = {
    params: Promise<{ courseId: string }>;
};

// Read courses data
async function getCoursesData() {
    return await getPageContent("courses");
}

// Generate static params for all courses
export async function generateStaticParams() {
    const data = await getCoursesData();
    if (!data || !data.courseList) return [];  // Fixed: use courseList

    return data.courseList.map((course: any) => ({  // Fixed: use courseList
        courseId: course.slug || course.id,  // Use slug for SEO-friendly URLs
    }));
}

// Generate metadata for each course
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { courseId } = await params;
    const data = await getCoursesData();
    const course = data?.courseList?.find((c: any) => c.slug === courseId || c.id === courseId);  // Match by slug or id

    if (!course) {
        return {
            title: "Course Not Found | ATREUS PHYSIO Academy",
            description: "The course you're looking for doesn't exist.",
        };
    }

    // Convert course data to SEO format for consistency
    const seoData = {
        metaTitle: `${course.title} | ATREUS PHYSIO Academy`,
        metaDescription: course.description,
        keywords: [course.title, "physiotherapy course", "professional development", "CPD physiotherapy", ...course.tags],
        canonical: `https://atreusphysio.com/courses/${course.id}`,
        ogTitle: `${course.title} | ATREUS PHYSIO Academy`,
        ogDescription: course.description,
        ogImage: course.image,
        ogType: "website",
        ogSiteName: "AtreusPhysio Academy",
        ogLocale: "en_IN",
        twitterCard: "summary_large_image",
        twitterTitle: `${course.title} | ATREUS PHYSIO Academy`,
        twitterDescription: course.description,
        twitterImage: course.image,
        robots: "index,follow",
    };

    return generateStandardMetadata(seoData);
}

export default async function CoursePage({ params }: Props) {
    const { courseId } = await params;
    const data = await getCoursesData();
    const course = data?.courseList?.find((c: any) => c.slug === courseId || c.id === courseId);

    if (!course) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#06113d] via-[#06113d] to-[#0a1a5c] text-white py-32 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e3171e]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e3171e]/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Course Info */}
                        <AnimatedSection>
                            <div className="flex gap-2 mb-4">
                                {course.tags.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 bg-[#e3171e] text-white text-sm font-medium rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl text-slate-300 mb-8">
                                {course.description}
                            </p>
                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#e3171e]" />
                                    <span>{course.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#e3171e]" />
                                    <span>{course.seatsLeft} seats left</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#e3171e]" />
                                    <span>{course.location}</span>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-bold">{course.price}</span>
                                <span className="text-2xl text-slate-400 line-through">{course.originalPrice}</span>
                                <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                                    {Math.round((1 - parseInt(course.price.replace(/[^0-9]/g, '')) / parseInt(course.originalPrice.replace(/[^0-9]/g, ''))) * 100)}% OFF
                                </span>
                            </div>
                            <Link href="/contact">
                                <Button className="bg-[#e3171e] hover:bg-[#c41218] text-white px-10 py-6 text-lg w-full md:w-auto">
                                    Enroll Now
                                </Button>
                            </Link>
                        </AnimatedSection>

                        {/* Right: Image */}
                        <AnimatedSection delay={0.2}>
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#06113d]/20 to-[#e3171e]/20 z-10"></div>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Course Topics */}
            {course.details?.topics && (
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <AnimatedSection>
                            <div className="flex items-center gap-3 mb-8">
                                <BookOpen className="w-8 h-8 text-[#e3171e]" />
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    What You'll Learn
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {course.details.topics.map((topic: string, index: number) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                        <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700 dark:text-slate-300">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {/* Learning Outcomes */}
            {course.details?.learningOutcomes && (
                <section className="py-16 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <AnimatedSection>
                            <div className="flex items-center gap-3 mb-8">
                                <Target className="w-8 h-8 text-[#e3171e]" />
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                    Learning Outcomes
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {course.details.learningOutcomes.map((outcome: string, index: number) => (
                                    <div key={index} className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl border-l-4 border-[#e3171e]">
                                        <Award className="w-6 h-6 text-[#06113d] dark:text-[#e3171e] shrink-0 mt-0.5" />
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {/* Technical Terms */}
            {course.details?.technicalTerms && (
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                                Key Concepts Covered
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {course.details.technicalTerms.map((term: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 font-medium"
                                    >
                                        {term}
                                    </span>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-[#06113d] to-[#0a1a5c] text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <AnimatedSection>
                        <Star className="w-16 h-16 text-[#e3171e] mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Elevate Your Practice?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Join {100 - course.seatsLeft} physiotherapists already enrolled. Only {course.seatsLeft} seats remaining!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button className="bg-[#e3171e] hover:bg-[#c41218] text-white px-10 py-6 text-lg">
                                    Enroll in {course.title}
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-6 text-lg">
                                    View All Courses
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
}
