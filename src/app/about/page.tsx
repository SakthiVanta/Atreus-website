import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FAQSection } from "@/components/sections/FAQSection";

const faqs = require("../../../data/locales/en/faqs.json");

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("about");
    if (!data) return {};

    return {
        title: data.seo.metaTitle,
        description: data.seo.metaDescription,
        keywords: data.seo.keywords,
        authors: [{ name: "AtreusPhysio Team" }],
        publisher: "AtreusPhysio",
        alternates: {
            canonical: data.seo.canonical,
        },
        robots: {
            index: data.seo.robots?.includes("index"),
            follow: data.seo.robots?.includes("follow"),
        },
        openGraph: {
            title: data.seo.ogTitle,
            description: data.seo.ogDescription,
            images: [data.seo.ogImage],
            url: data.seo.canonical,
            type: "website",
            siteName: "AtreusPhysio",
        },
    };
}

export default async function AboutPage() {
    const data = await getPageContent("about");
    const homepage = await getPageContent("homepage");

    if (!data) return <div>Error loading content</div>;

    // Get success story images
    const images = homepage?.successStories?.snapshots || [];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900">
            <JsonLd pageId="about" />

            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#06113d] via-[#06113d] to-[#0a1a5c] text-white py-24 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e3171e]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e3171e]/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-full">
                        <AnimatedSection className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e3171e]">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                </svg>
                                Our Story
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                {data.hero.title.includes('ATREUS PHYSIO') ? (
                                    <>
                                        {data.hero.title.split('ATREUS PHYSIO')[0]}
                                        <span className="text-[#e3171e]">ATREUS PHYSIO</span>
                                    </>
                                ) : (
                                    data.hero.title
                                )}
                            </h1>
                            <p className="text-xl text-slate-300 leading-relaxed">
                                {data.hero.subtitle}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* About Us Philosophy Section - First */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            {data.philosophy.title}
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-8"></div>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            {data.philosophy.intro}
                        </p>
                    </AnimatedSection>

                    {/* Philosophy sections with alternating left-right images */}
                    <div className="space-y-24">
                        {data.philosophy.sections.map((section: any, i: number) => {
                            const image = images[i % images.length];
                            const isEven = i % 2 === 0;

                            return (
                                <AnimatedSection key={i} delay={i * 0.1}>
                                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                                        {/* Image */}
                                        <div className="w-full lg:w-1/2">
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative group">
                                                {image && (
                                                    <img
                                                        src={image.image}
                                                        alt={image.title}
                                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                )}
                                                {!image && (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="w-full lg:w-1/2">
                                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                                {section.title}
                                            </h3>
                                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Founder Section - After Philosophy */}
            <section className="py-24 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Meet Our Founder
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
                    </AnimatedSection>

                    <div className="flex flex-col lg:flex-row gap-16 items-start max-w-6xl mx-auto">
                        <AnimatedSection className="w-full lg:w-1/3 shrink-0">
                            <div className="aspect-[3/4] rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-xl relative group">
                                {/* Image placeholder */}
                                <div className="absolute inset-0 bg-slate-300 dark:bg-slate-600 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 text-white">
                                    <h3 className="text-xl font-bold">{data.founder.name}</h3>
                                    <p className="text-blue-300 text-sm">{data.founder.role}</p>
                                    <p className="text-slate-300 text-xs mt-1">{data.founder.qualifications}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        <div className="w-full lg:w-2/3 space-y-10">
                            <AnimatedSection delay={0.2}>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Experience & Clinical Interests</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6">
                                    {data.founder.bio}
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {data.founder.experience}
                                </p>
                            </AnimatedSection>

                            {data.founder.achievements && (
                                <AnimatedSection delay={0.3} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 text-lg">
                                        <span className="w-1.5 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                                        Key Achievements
                                    </h4>

                                    <div className="space-y-6">
                                        {data.founder.achievements.national && (
                                            <div>
                                                <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm uppercase tracking-wider">National Level Events</h5>
                                                <ul className="space-y-2">
                                                    {data.founder.achievements.national.map((item: string, j: number) => (
                                                        <li key={j} className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-2">
                                                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {data.founder.achievements.state && (
                                            <div>
                                                <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm uppercase tracking-wider">State Level Events</h5>
                                                <ul className="space-y-2">
                                                    {data.founder.achievements.state.map((item: string, j: number) => (
                                                        <li key={j} className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-2">
                                                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {data.founder.achievements.university && (
                                            <div>
                                                <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-2 text-sm uppercase tracking-wider">Inter University Events</h5>
                                                <ul className="space-y-2">
                                                    {data.founder.achievements.university.map((item: string, j: number) => (
                                                        <li key={j} className="text-slate-600 dark:text-slate-400 text-sm flex items-start gap-2">
                                                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </AnimatedSection>
                            )}

                            <AnimatedSection delay={0.4}>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Approach to Treatment</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {data.founder.approach}
                                </p>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Props Section - Brand Colors Only */}
            {data.valueProps && (
                <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
                    {/* Subtle background decoration with brand colors */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,17,61,0.03),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(227,23,30,0.03),transparent_50%)]"></div>

                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <AnimatedSection className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                What Makes ATREUS PHYSIO Different
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#06113d] to-[#e3171e] mx-auto rounded-full mb-6"></div>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                                Our approach combines science, empathy, and education to create lasting change
                            </p>
                        </AnimatedSection>

                        {/* Professional Card Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data.valueProps.map((prop: any, i: number) => {
                                // Icon SVGs
                                const getIcon = (id: string) => {
                                    const icons: Record<string, any> = {
                                        "evidence": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" /><path d="M8.5 2h7" /><path d="M7 16h10" /></svg>,
                                        "personalized": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>,
                                        "education": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
                                        "holistic": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
                                        "community": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                                        "innovation": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>,
                                    };
                                    return icons[id] || icons["innovation"];
                                };

                                // Alternate between navy and red
                                const isNavy = i % 2 === 0;

                                return (
                                    <AnimatedSection
                                        key={prop.id}
                                        delay={i * 0.1}
                                    >
                                        <div className="group relative h-full">
                                            {/* Card */}
                                            <div className="relative h-full bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-xl">
                                                {/* Icon with brand colors */}
                                                <div
                                                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg"
                                                    style={{ backgroundColor: isNavy ? '#06113d' : '#e3171e' }}
                                                >
                                                    {getIcon(prop.id)}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">
                                                    {prop.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                                    {prop.desc}
                                                </p>

                                                {/* Hover accent line with brand color */}
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    style={{ backgroundColor: isNavy ? '#06113d' : '#e3171e' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <FAQSection faqs={faqs.about} />
        </main>
    );
}
