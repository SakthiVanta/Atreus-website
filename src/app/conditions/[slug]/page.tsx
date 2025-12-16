import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { conditions } from "@/data/conditions";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

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
                            <h2 className="text-2xl font-bold text-[#06113d] dark:text-white mb-6">Common Causes</h2>
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                                <ul className="space-y-4">
                                    {condition.content.causes.map((cause, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-[#e3171e]" />
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{cause}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-[#06113d] dark:text-white mb-4">Our Treatment Approach</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                {condition.content.treatmentApproach}
                            </p>

                            <div className="bg-[#e3171e]/5 rounded-xl p-6 border border-[#e3171e]/10 flex gap-4 items-start">
                                <AlertCircle className="w-6 h-6 text-[#e3171e] shrink-0" />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Prevention Tip</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {condition.content.prevention}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </article>

                    {/* Sidebar / Quick Facts */}
                    <aside className="space-y-8">
                        {/* Quick Summary Card */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 sticky top-24">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-sm">
                                At a Glance
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Key Symptoms</h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {condition.summary.symptoms}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Red Flags</h4>
                                    <p className="text-sm text-[#e3171e] font-medium leading-relaxed">
                                        {condition.summary.whenToSeekHelp}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <Button className="w-full bg-[#06113d] hover:bg-[#e3171e] text-white">
                                        Book Consultation
                                    </Button>
                                    <p className="text-xs text-center text-slate-400 mt-3">
                                        Available both In-Clinic and Online
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
