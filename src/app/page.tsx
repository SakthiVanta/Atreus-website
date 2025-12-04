import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookingForm } from "@/components/sections/BookingForm";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ConditionsGrid } from "@/components/sections/ConditionsGrid";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("homepage");
    if (!data) return {};

    return {
        title: data.seo.metaTitle,
        description: data.seo.metaDescription,
        keywords: data.seo.keywords,
        authors: [{ name: "AtreusPhysio" }],
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

export default async function Home() {
    const data = await getPageContent("homepage");

    if (!data) {
        return <div>Error loading content</div>;
    }

    return (
        <main className="min-h-screen bg-white overflow-x-hidden">
            <JsonLd pageId="homepage" />

            {/* Hero Carousel */}
            {data.heroSlides && <HeroCarousel slides={data.heroSlides} />}

            {/* Stats Section */}
            {data.stats && (
                <div className="bg-slate-900 py-12 text-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {data.stats.map((stat: any, i: number) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            )}

            {/* Value Props Teaser */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <AnimatedSection className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            What Makes ATREUS PHYSIO Different
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
                            Combining clinical expertise with patient education for lasting results. We believe in a science-driven, assessment-first approach that puts you in control of your recovery.
                        </p>

                        <a
                            href="/about"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 hover:border-blue-300 transition-all group shadow-sm hover:shadow-md"
                        >
                            View All
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </AnimatedSection>
                </div>
            </section>

            {/* Founders Section */}
            {data.founders && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <AnimatedSection className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Meet Your Therapist
                            </h2>
                            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        </AnimatedSection>

                        <div className="max-w-6xl mx-auto">
                            {data.founders.map((founder: any, i: number) => (
                                <div key={i} className="flex flex-col lg:flex-row gap-16 items-start">
                                    <AnimatedSection delay={0.2} className="w-full lg:w-1/3 shrink-0">
                                        <div className="aspect-[3/4] rounded-2xl bg-slate-200 overflow-hidden shadow-xl relative group">
                                            {/* Image placeholder */}
                                            <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 text-white">
                                                <h3 className="text-xl font-bold">{founder.name}</h3>
                                                <p className="text-blue-300 text-sm">{founder.role}</p>
                                                <p className="text-slate-300 text-xs mt-1">{founder.qualifications}</p>
                                            </div>
                                        </div>
                                    </AnimatedSection>

                                    <div className="w-full lg:w-2/3 space-y-8">
                                        <AnimatedSection delay={0.3}>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Experience & Clinical Interests</h3>
                                            <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                                {founder.shortBio || founder.bio}
                                            </p>
                                        </AnimatedSection>

                                        <AnimatedSection delay={0.4}>
                                            <a
                                                href="/about"
                                                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors group"
                                            >
                                                Read Full Profile
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </a>
                                        </AnimatedSection>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Conditions Section */}
            {data.conditions && <ConditionsGrid conditions={data.conditions} />}

            {/* Services Section */}
            {data.services && <ServicesGrid services={data.services} />}

            {/* Success Stories Section */}
            {data.successStories && <SuccessStories data={data.successStories} />}

            {/* Booking Form Section */}
            {data.forms?.bookingForm && (
                <section className="py-24 px-4 md:px-8 bg-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                    <div className="max-w-4xl mx-auto relative z-10">
                        <AnimatedSection className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
                            <BookingForm formConfig={data.forms.bookingForm} />
                        </AnimatedSection>
                    </div>
                </section>
            )}
        </main>
    );
}
