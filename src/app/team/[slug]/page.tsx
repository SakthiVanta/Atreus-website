import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Linkedin, BadgeCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getPageContent } from "@/lib/content";

interface Props {
    params: Promise<{
        slug: string;
    }>
}

async function getTeamMember(slug: string) {
    const data = await getPageContent('homepage');
    if (!data || !data.founders) return null;
    return data.founders.find((member: any) => member.slug === slug);
}

import { generateStandardMetadata } from "@/lib/seo-utils";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const member = await getTeamMember(slug);
    if (!member) return {};

    // Construct SEO object for the utility
    const seoData = {
        title: `${member.name} | ${member.role} - Atreus Physio`,
        description: member.shortBio || member.bio,
        slug: `team/${slug}`,
        image: member.image,
        // Fallback keywords if not explicit
        keywords: [member.name, member.role, "Physiotherapist", "Trichy", "Atreus Physio"],
    };

    return generateStandardMetadata(seoData);
}

export async function generateStaticParams() {
    const data = await getPageContent('homepage');
    if (!data || !data.founders) return [];

    return data.founders.map((member: any) => ({
        slug: member.slug,
    }));
}

export default async function TeamProfilePage({ params }: Props) {
    const { slug } = await params;
    const member = await getTeamMember(slug);

    if (!member) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#e3171e] mb-12 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to About Us
                </Link>

                <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-24">
                    {/* Sidebar / Profile Image */}
                    <div className="space-y-8">
                        <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative">
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 400px"
                                priority
                            />
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <BadgeCheck className="w-5 h-5 text-[#e3171e]" />
                                Specialties
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {member.specialties?.map((spec: string, i: number) => (
                                    <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg uppercase tracking-wide">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {member.social?.linkedin && (
                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" className="w-full gap-2">
                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                                {member.name}
                            </h1>
                            <p className="text-xl text-[#e3171e] font-medium mb-6">
                                {member.role}
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                                {member.bio}
                            </p>
                        </div>

                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white not-prose mb-6">
                                Clinical Philosophy
                            </h3>
                            <blockquote className="border-l-4 border-[#e3171e] pl-6 italic text-xl text-slate-700 dark:text-slate-200">
                                "{member.philosophy}"
                            </blockquote>
                        </div>

                        {/* Achievements */}
                        {member.achievements && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Trophy className="w-6 h-6 text-[#e3171e]" />
                                    Major Event Experience
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {member.achievements.map((group: any, i: number) => (
                                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <h4 className="font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                                                {group.category}
                                            </h4>
                                            <ul className="space-y-3">
                                                {group.items.map((item: string, j: number) => (
                                                    <li key={j} className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                                                        • {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="bg-[#06113d] text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Book a Session with {member.name.split(" ")[1]}</h3>
                                <p className="text-slate-300">Available for assessment and consultation.</p>
                            </div>
                            <Link href="/contact">
                                <Button size="lg" className="bg-[#e3171e] hover:bg-[#b01217] text-white whitespace-nowrap">
                                    Book Appointment
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
