import { Metadata } from "next";
import { getPageContent } from "@/lib/content";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { generateStandardMetadata } from "@/lib/seo-utils";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("homepage");
    if (!data?.seo?.pagesSeo?.services) return {};
    return generateStandardMetadata(data.seo.pagesSeo.services);
}

export default async function ServicesPage() {
    const data = await getPageContent("homepage");

    if (!data || !data.services) {
        return <div>Error loading services</div>;
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeader
                    title="Our Services"
                    description="We offer a wide range of specialized treatments tailored to your unique needs. Our evidence-based approach ensures you receive the most effective care for your condition."
                    className="mb-16 text-center mx-auto [&>div]:items-center [&>div]:text-center [&_p]:mx-auto"
                />

                <ServicesGrid services={data.services} showHeader={false} />

                {/* Common CTA at bottom */}
                <div className="mt-24 p-8 md:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3171e]/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-[#e3171e]/20 transition-colors duration-500" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-[#e3171e]" />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Next Step</span>
                            </div>
                            <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-3xl">
                                Appointments Are Scheduled Following an Initial Assessment to Understand Your Goals and Suitability for Rehabilitation
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="px-10 py-5 bg-[#e3171e] hover:bg-[#c41219] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 shrink-0"
                        >
                            Contact us
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
