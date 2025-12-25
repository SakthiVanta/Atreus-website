import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Linkedin, BadgeCheck, Trophy, GraduationCap, Quote, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getPageContent } from "@/lib/content";
import { generateStandardMetadata } from "@/lib/seo-utils";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const member = await getTeamMember(slug);
    if (!member) return {};

    const seoData = {
        title: `${member.name} | ${member.role} - Atreus Physio`,
        description: member.shortBio || member.bio,
        slug: `team/${slug}`,
        image: member.image,
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
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Hero Section */}
            <div className="bg-[#06113d] text-white pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3171e]/10 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e3171e]/10 rounded-full blur-3xl -ml-10 -mb-10" />

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-12 transition-colors font-medium text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to About Us
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <AnimatedSection className="w-full md:w-1/3 shrink-0 flex justify-center md:justify-start">
                            <div className="w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative group ring-1 ring-white/20 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            </div>
                        </AnimatedSection>

                        <div className="w-full md:w-2/3 space-y-6">
                            <AnimatedSection delay={0.1}>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-[#e3171e] bg-opacity-10">
                                    <BadgeCheck className="w-4 h-4" />
                                    Lead Clinician
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-2">
                                    {member.name}
                                </h1>
                                <p className="text-xl md:text-2xl text-slate-300 font-medium">
                                    {member.role}
                                </p>
                                <p className="text-slate-400 font-mono text-sm border-l-2 border-[#e3171e] pl-3">
                                    {member.qualifications}
                                </p>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2} className="flex gap-4 pt-4">
                                {member.social?.linkedin && (
                                    <a
                                        href={member.social.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-full font-medium transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                                    </a>
                                )}
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#e3171e] hover:bg-[#c41219] text-white rounded-full font-medium transition-colors"
                                >
                                    Book Appointment
                                </Link>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                <div className="grid lg:grid-cols-[1fr_350px] gap-16">

                    {/* Main Content Column */}
                    <div className="space-y-16">
                        {/* Bio Section */}
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About</h2>
                            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                                <p className="lead">{member.bio}</p>
                                {member.subBio && <p>{member.subBio}</p>}
                            </div>
                        </AnimatedSection>

                        {/* Award Section */}
                        {member.award && (
                            <AnimatedSection delay={0.2} className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-3xl border border-amber-100 dark:border-amber-800/30 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Trophy className="w-24 h-24 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-500 mb-3 flex items-center gap-2">
                                        <Trophy className="w-6 h-6" />
                                        {member.award.title}
                                    </h3>
                                    <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed font-medium">
                                        {member.award.content}
                                    </p>
                                </div>
                            </AnimatedSection>
                        )}

                        {/* Clinical Background */}
                        {member.clinicalBackground && (
                            <AnimatedSection delay={0.3}>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-[#e3171e]" />
                                    {member.clinicalBackground.title}
                                </h3>
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-8">
                                    <div>
                                        <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                                            {member.clinicalBackground.intro}
                                        </p>
                                        <ul className="grid md:grid-cols-2 gap-4">
                                            {member.clinicalBackground.events.map((event: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                                    <div className="w-2 h-2 rounded-full bg-[#e3171e] mt-2 shrink-0" />
                                                    <span className="text-sm font-medium">{event}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-start gap-4 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl">
                                        <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
                                        <p className="text-slate-700 dark:text-slate-300 italic">
                                            {member.clinicalBackground.academic}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        )}

                        {/* Philosophy & Approach */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {member.philosophy && typeof member.philosophy === 'object' && (
                                <AnimatedSection delay={0.4} className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-[#e3171e]/20 rounded-full blur-2xl" />
                                    <Quote className="w-8 h-8 text-[#e3171e] mb-4" />
                                    <h3 className="text-xl font-bold mb-4">{member.philosophy.title}</h3>
                                    <p className="text-slate-300 leading-relaxed">
                                        {member.philosophy.content}
                                    </p>
                                </AnimatedSection>
                            )}

                            {member.approach && (
                                <AnimatedSection delay={0.5} className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <div className="w-2 h-8 bg-[#e3171e] rounded-full" />
                                        {member.approach.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {member.approach.content}
                                    </p>
                                </AnimatedSection>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Specialties Card */}
                        <AnimatedSection delay={0.6} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl sticky top-8">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg uppercase tracking-wide">
                                Clinical Specialties
                            </h3>
                            <div className="flex flex-col gap-3">
                                {member.specialties?.map((spec: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-default">
                                        <div className="w-8 h-8 rounded-full bg-[#e3171e]/10 text-[#e3171e] flex items-center justify-center shrink-0 group-hover:bg-[#e3171e] group-hover:text-white transition-colors">
                                            <BadgeCheck className="w-4 h-4" />
                                        </div>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium text-sm">
                                            {spec}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <Link href="/contact" className="block w-full">
                                    <Button className="w-full bg-[#06113d] hover:bg-[#0a1a5c] text-white py-6 text-lg rounded-xl">
                                        Schedule Consultation
                                    </Button>
                                </Link>
                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Available for In-Clinic & Online sessions
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>

                </div>
            </div>
        </main>
    );

}
