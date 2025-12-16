import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getPageContent } from "@/lib/content";

interface Props {
    params: Promise<{
        slug: string;
    }>
}

async function getService(slug: string) {
    const data = await getPageContent('homepage');
    if (!data || !data.services) return null;
    return data.services.find((service: any) => (service.slug === slug || service.id === slug));
}

import { generateStandardMetadata } from "@/lib/seo-utils";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = await getService(slug);
    if (!service) return {};

    // Construct SEO object for the utility
    const seoData = {
        title: `${service.title} | Services - Atreus Physio`,
        description: service.excerpt || service.description,
        slug: `services/${slug}`,
        image: service.image?.src,
        // Fallback keywords if not explicit in service data
        keywords: ["Physiotherapy", "Trichy", service.title, "Rehabilitation", "Atreus Physio"],
    };

    return generateStandardMetadata(seoData);
}

export async function generateStaticParams() {
    const data = await getPageContent('homepage');
    if (!data || !data.services) return [];

    return data.services.map((service: any) => ({
        slug: service.slug || service.id,
    }));
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#e3171e] mb-12 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Services
                </Link>

                {/* Header Section */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-center">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 bg-[#e3171e]/10 text-[#e3171e] font-bold rounded-full text-sm uppercase tracking-wider">
                            Specialized Treatment
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                            {service.description}
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link href="/contact">
                                <Button size="lg" className="bg-[#e3171e] hover:bg-[#b01217] text-white">
                                    Book Consultation
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={service.image.src}
                            alt={service.image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 600px"
                            priority
                        />
                    </div>
                </div>

                {/* Deep Dive & Benefits */}
                <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-24">
                    <div className="space-y-12">
                        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white not-prose mb-6">
                                Why This Matters
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {service.fullDescription}
                            </p>
                        </div>

                        {/* Process / How We Help */}
                        {service.process && (
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                                    Our Treatment Process
                                </h3>
                                <div className="grid gap-6">
                                    {service.process.map((step: string, index: number) => (
                                        <div key={index} className="flex gap-6 items-start">
                                            <div className="w-8 h-8 rounded-full bg-[#06113d] text-white flex items-center justify-center font-bold shrink-0 mt-1">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                                                    Step {index + 1}
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {step}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Benefits & CTA */}
                    <div className="space-y-8">
                        {service.benefits && (
                            <div className="bg-[#06113d] text-white p-8 rounded-3xl">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6 text-[#e3171e]" />
                                    Key Benefits
                                </h3>
                                <ul className="space-y-4">
                                    {service.benefits.map((benefit: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#e3171e] mt-2.5 shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                Not sure if this is right for you?
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Book a preliminary assessment to discuss your symptoms and get a clear diagnosis.
                            </p>
                            <Link href="/contact" className="flex items-center gap-2 text-[#e3171e] font-bold hover:underline">
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
