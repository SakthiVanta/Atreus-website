import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BookingTrigger } from "@/components/ui/BookingTrigger";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getStory(slug: string) {
    const data = await getPageContent("homepage");
    const story = data?.successStories?.snapshots?.find((s: any) => s.slug === slug);
    return story;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const story = await getStory(slug);

    if (!story || !story.seo) {
        return {};
    }

    const { seo } = story;

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
            type: "article",
            url: seo.canonical,
            images: [
                {
                    url: story.image,
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
            images: [story.image],
        },
    };
}

export async function generateStaticParams() {
    const data = await getPageContent("homepage");
    const stories = data?.successStories?.snapshots || [];

    return stories.map((story: any) => ({
        slug: story.slug,
    }));
}

export default async function SuccessStoryDetail({ params }: PageProps) {
    const { slug } = await params;
    const story = await getStory(slug);

    if (!story) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-12 md:pt-24 bg-white dark:bg-slate-900 pb-24">
            {/* Navigation Bar */}
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
                <div className="max-w-4xl mx-auto px-4 md:px-8 h-16 flex items-center">
                    <Link
                        href="/success-stories"
                        className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-[#e3171e] transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to All Stories
                    </Link>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        {story.title}
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        {story.short_description}
                    </p>
                </header>

                {/* Hero Image */}
                <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] relative bg-slate-100 dark:bg-slate-800">
                    <img
                        src={story.image}
                        alt={story.title}
                        className="object-cover object-top w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
                    {/* Split content by newlines and wrap in paragraphs */}
                    {story.article.split('\n').filter((p: string) => p.trim() !== '').map((paragraph: string, index: number) => (
                        <p key={index} className="text-slate-600 dark:text-slate-300 leading-8 mb-6 text-lg">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Inspired by {story.title.split(' ')[0]}'s journey?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">
                        Start your own recovery story today.
                    </p>

                    <div className="text-start flex justify-center">
                        <BookingTrigger className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#e3171e] border border-transparent rounded-full hover:bg-[#c4121b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e3171e] shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                            Book Your Assessment
                        </BookingTrigger>
                    </div>
                </div>
            </article>
        </main>
    );
}
