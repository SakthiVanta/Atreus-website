import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("homepage");
    const seo = data?.seo?.pagesSeo?.successStories;

    if (!seo) return {};

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: {
            canonical: seo.canonical,
        },
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: seo.author }],
        publisher: seo.publisher,
        openGraph: {
            title: seo.title,
            description: seo.description,
            type: "website",
            url: seo.canonical,
            images: [
                {
                    url: "/images/og-home.jpg", // Default OG image or specific one if added
                    width: 1200,
                    height: 630,
                    alt: seo.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.description,
        },
    };
}

export default async function SuccessStoriesPage() {
    const data = await getPageContent("homepage");
    const stories = data?.successStories?.snapshots || [];

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-24">
            {/* Hero Section */}
            <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#06113d] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e3171e] rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Success Stories</h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                        Real journeys of recovery. Discover how our science-driven approach helps athletes and individuals reclaim their lives.
                    </p>
                </div>
            </section>

            {/* Stories Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story: any) => (
                        <Link
                            href={`/success-stories/${story.slug}`}
                            key={story.id}
                            className="group block bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                            </div>

                            <div className="p-8">
                                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#e3171e] transition-colors">
                                    {story.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                                    {story.short_description}
                                </p>
                                <span className="inline-flex items-center text-[#e3171e] font-semibold text-sm">
                                    Read Full Story <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
