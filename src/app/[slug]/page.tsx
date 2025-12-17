import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Link from "next/link";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import { BookingTrigger } from "@/components/ui/BookingTrigger";

type Props = {
    params: Promise<{ slug: string }>;
};

// Read dynamic pages data
async function getDynamicPages() {
    try {
        const fs = require('fs').promises;
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data/locales/en/dynamic-pages.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        return { pages: [] };
    }
}

// Generate static params for all dynamic routes
export async function generateStaticParams() {
    const data = await getDynamicPages();
    return data.pages.map((page: any) => ({
        slug: page.slug,
    }));
}

// Generate metadata for each dynamic page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = await getDynamicPages();
    const page = data.pages.find((p: any) => p.slug === slug);

    if (!page) {
        return {
            title: "Page Not Found | ATREUS PHYSIO",
            description: "The page you're looking for doesn't exist.",
        };
    }

    return {
        title: page.title,
        description: page.description,
        keywords: page.keywords,
        authors: [{ name: "AtreusPhysio" }],
        publisher: "AtreusPhysio",
        alternates: {
            canonical: `https://www.atreusphysio.com/${page.slug}`,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: page.title,
            description: page.description,
            url: `https://www.atreusphysio.com/${page.slug}`,
            type: "website",
            siteName: "AtreusPhysio",
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title: page.title,
            description: page.description,
        },
    };
}

export default async function DynamicPage({ params }: Props) {
    const { slug } = await params;
    const data = await getDynamicPages();
    const page = data.pages.find((p: any) => p.slug === slug);

    if (!page) {
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
                    <AnimatedSection>
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-12 h-1 bg-[#e3171e]"></div>
                                <span className="text-slate-300 font-medium">ATREUS PHYSIO</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                {page.h1}
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
                                {page.content.intro}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <BookingTrigger className="bg-[#e3171e] hover:bg-[#c41218] text-white px-8 py-6 text-lg">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book Appointment
                                </BookingTrigger>
                                <a href="tel:+917010294784">
                                    <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-6 text-lg">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Call Now
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {page.content.sections.map((section: any, index: number) => (
                            <AnimatedSection key={index} delay={index * 0.1}>
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                        {section.content}
                                    </p>
                                    <Link href="/contact" className="inline-flex items-center text-[#e3171e] font-semibold hover:gap-3 transition-all">
                                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-[#06113d] to-[#0a1a5c] text-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your Recovery?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Book your appointment today at ATREUS PHYSIO and take the first step towards a pain-free life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <BookingTrigger className="bg-[#e3171e] hover:bg-[#c41218] text-white px-8 py-4 text-lg">
                                Book Appointment
                            </BookingTrigger>
                            <Link href="/about">
                                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 text-lg">
                                    Learn About Us
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    );
}
