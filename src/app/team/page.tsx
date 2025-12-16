import { Metadata } from "next";
import { getPageContent } from "@/lib/content";
import { generateStandardMetadata } from "@/lib/seo-utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("homepage");
    if (!data?.seo?.pagesSeo?.team) return {};
    return generateStandardMetadata(data.seo.pagesSeo.team);
}

export default async function TeamPage() {
    const data = await getPageContent("homepage");

    if (!data || !data.founders) {
        return <div>Error loading team data</div>;
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeader
                    title="Meet Our Team"
                    description="Experienced professionals dedicated to your recovery and wellness journey."
                    className="mb-16 text-center mx-auto [&>div]:items-center [&>div]:text-center [&_p]:mx-auto"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.founders.map((founder: any, i: number) => (
                        <AnimatedSection key={i} delay={i * 0.1}>
                            <Link href={`/team/${founder.slug || 'dr-swatheeshwaran'}`} className="block group">
                                <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 h-full flex flex-col">
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <Image
                                            src={founder.image}
                                            alt={founder.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
                                            <p className="text-[#e3171e] text-sm font-medium">{founder.role}</p>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col grow">
                                        <p className="text-slate-600 dark:text-slate-300 line-clamp-3 mb-6 grow">
                                            {founder.shortBio || founder.bio}
                                        </p>
                                        <span className="flex items-center gap-2 text-[#e3171e] font-bold group-hover:gap-3 transition-all">
                                            View Profile <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </main>
    );
}
