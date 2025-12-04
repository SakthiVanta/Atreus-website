import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

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

    if (!data) return <div>Error loading content</div>;

    return (
        <main className="min-h-screen bg-white">
            <JsonLd pageId="about" />

            {/* Hero */}
            <section className="relative py-24 bg-slate-50 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <AnimatedSection>
                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                                {data.hero.title}
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                {data.hero.subtitle}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <AnimatedSection className="w-full lg:w-1/3 shrink-0">
                            <div className="aspect-[3/4] rounded-2xl bg-slate-200 overflow-hidden shadow-xl relative group">
                                {/* Image placeholder */}
                                <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 text-white">
                                    <h3 className="text-xl font-bold">{data.founder.name}</h3>
                                    <p className="text-blue-300 text-sm">{data.founder.role}</p>
                                    <p className="text-slate-300 text-xs mt-1">{data.founder.qualifications}</p>
                                </div>
                            </div>
                        </AnimatedSection>

                        <div className="w-full lg:w-2/3 space-y-10">
                            <AnimatedSection delay={0.2}>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">Experience & Clinical Interests</h2>
                                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                    {data.founder.bio}
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    {data.founder.experience}
                                </p>
                            </AnimatedSection>

                            {data.founder.achievements && (
                                <AnimatedSection delay={0.3} className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
                                        <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
                                        Key Achievements
                                    </h4>

                                    <div className="space-y-6">
                                        {data.founder.achievements.national && (
                                            <div>
                                                <h5 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">National Level Events</h5>
                                                <ul className="space-y-2">
                                                    {data.founder.achievements.national.map((item: string, j: number) => (
                                                        <li key={j} className="text-slate-600 text-sm flex items-start gap-2">
                                                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {data.founder.achievements.state && (
                                            <div>
                                                <h5 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">State Level Events</h5>
                                                <ul className="space-y-2">
                                                    {data.founder.achievements.state.map((item: string, j: number) => (
                                                        <li key={j} className="text-slate-600 text-sm flex items-start gap-2">
                                                            <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {data.founder.achievements.university && (
                                            <div>
                                                <h5 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wider">Inter University Events</h5>
                                                <ul className="space-y-2">
                                                    {data.founder.achievements.university.map((item: string, j: number) => (
                                                        <li key={j} className="text-slate-600 text-sm flex items-start gap-2">
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
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Approach to Treatment</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {data.founder.approach}
                                </p>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.philosophy.title}</h2>
                        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            {data.philosophy.intro}
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8">
                        {data.philosophy.sections.map((section: any, i: number) => (
                            <AnimatedSection key={i} delay={i * 0.1} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                                <h3 className="text-xl font-bold text-blue-400 mb-4">{section.title}</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    {section.content}
                                </p>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Props Section */}
            {data.valueProps && (
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <AnimatedSection className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                What Makes ATREUS PHYSIO Different
                            </h2>
                            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                                Combining clinical expertise with patient education for lasting results.
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data.valueProps.map((prop: any, i: number) => (
                                <AnimatedSection key={prop.id} delay={i * 0.1} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl mb-6 flex items-center justify-center text-blue-600">
                                        <div className="w-6 h-6 bg-current rounded-full opacity-20" /> {/* Icon placeholder */}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900">{prop.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm">{prop.desc}</p>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
