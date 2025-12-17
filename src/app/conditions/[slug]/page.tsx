import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { conditions } from "@/data/conditions";
import { ConditionBookingCard } from "@/components/conditions/ConditionBookingCard";

interface Props {
    params: Promise<{
        slug: string;
    }>
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const condition = conditions.find((c) => c.slug === slug);
    if (!condition) return {};

    return {
        title: condition.seo.title,
        description: condition.seo.description,
        keywords: condition.seo.keywords,
    };
}

// Generate Static Params for SSG (optional but good for performance)
export async function generateStaticParams() {
    return conditions.map((condition) => ({
        slug: condition.slug,
    }));
}

export default async function ConditionDetailsPage({ params }: Props) {
    const { slug } = await params;
    const condition = conditions.find((c) => c.slug === slug);

    if (!condition) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950">
            {/* Hero Section */}
            <section className="relative bg-[#06113d] text-white py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#e3171e]/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px]" />

                <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
                    <Link
                        href="/conditions"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Conditions
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        {condition.title}
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        {condition.summary.whatItIs}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                <div className="grid md:grid-cols-[1fr_300px] gap-12">

                    {/* Main Article */}
                    <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[#06113d] dark:text-white mb-4">Overview</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {condition.content.overview}
                            </p>
                        </section>



                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[#06113d] dark:text-white mb-4">When to Seek Further Evaluation</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                {condition.summary.whenToSeekHelp}
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[#06113d] dark:text-white mb-4">How ATREUS PHYSIO Treats It</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                {condition.content.treatmentApproach}
                            </p>


                        </section>
                    </article>

                    {/* Sidebar / Quick Facts */}
                    <aside className="space-y-8">
                        {/* Quick Summary Card */}
                        <ConditionBookingCard />
                    </aside>
                </div>
            </div>
        </main>
    );
}
