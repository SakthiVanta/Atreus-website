import { Metadata } from "next";
import { ClipboardList, User, FlaskConical, BookOpen, TrendingUp, Activity, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getPageContent } from "@/lib/content";
import { generateStandardMetadata } from "@/lib/seo-utils";


export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("homepage");
    if (!data?.seo?.pagesSeo?.methodology) return {};
    return generateStandardMetadata(data.seo.pagesSeo.methodology);
}

const ICON_MAP: Record<string, any> = {
    assessment: ClipboardList,
    biomechanics: Activity,
    science: FlaskConical,
    "patient-centred": User,
    evidence: BookOpen,
    progressive: TrendingUp
};

export default async function MethodologyPage() {
    const data = await getPageContent('homepage');
    const pillars = data?.valueProps || [];

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero */}
            <section className="bg-[#06113d] text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        The Atreus Approach
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Why we achieve results where others fail. A fusion of clinical expertise, exercise science, and genuine care.
                    </p>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24">
                    {pillars.map((pillar: any, index: number) => {
                        const isEven = index % 2 === 0;
                        const Icon = ICON_MAP[pillar.id] || Activity;
                        return (
                            <div key={index} className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                                {/* Visual Side (Card) */}
                                <div className="w-full md:w-1/2">
                                    <div className={`relative p-8 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 h-full min-h-[300px] flex flex-col justify-center`}>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3171e]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                        <div className="w-20 h-20 rounded-2xl bg-[#e3171e]/10 text-[#e3171e] flex items-center justify-center mb-6 z-10">
                                            <Icon className="w-10 h-10" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 z-10">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-slate-500 font-medium z-10">
                                            Principle #{index + 1}
                                        </p>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                        {pillar.title}
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                        {pillar.description || pillar.desc}
                                    </p>

                                    {pillar.details && (
                                        <ul className="space-y-4">
                                            {pillar.details.map((detail: string, i: number) => (
                                                <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                                                    <div className="mt-1 bg-white dark:bg-slate-800 p-1 rounded-full shadow-sm">
                                                        <CheckCircle2 className="w-5 h-5 text-[#e3171e]" />
                                                    </div>
                                                    <span className="text-slate-700 dark:text-slate-300 font-medium">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Ready to experience the difference?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                        Book a consultation today and start your journey towards a pain-free, active life.
                    </p>
                    <Link href="/contact">
                        <Button className="bg-[#e3171e] hover:bg-[#b01217] text-white px-8">
                            Book Appointment
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
