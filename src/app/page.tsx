import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { generateStandardMetadata } from "@/lib/seo-utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookingForm } from "@/components/sections/BookingForm";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ConditionsGrid } from "@/components/sections/ConditionsGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("homepage");
    if (!data) return {};

    return generateStandardMetadata(data.seo);
}

export default async function Home() {
    const data = await getPageContent("homepage");

    if (!data) {
        return <div>Error loading content</div>;
    }

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 overflow-x-hidden">
            <JsonLd pageId="homepage" />

            {/* Hero Carousel */}
            {data.heroSlides && <HeroCarousel slides={data.heroSlides} />}

            {/* Stats Section */}
            {data.stats && (
                <div className="bg-slate-900 py-12 text-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {data.stats.map((stat: any, i: number) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="text-3xl md:text-4xl font-bold text-[#e3171e] mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            )}



            {/* Conditions Section */}
            {data.conditions && <ConditionsGrid conditions={data.conditions} />}

            {/* Services Section */}
            {data.services && <ServicesGrid services={data.services} />}

            {/* Success Stories Section */}
            {data.successStories && <SuccessStories data={data.successStories} />}
            {/* Value Props Teaser */}
            <section className="py-24 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <AnimatedSection>
                        <SectionHeader
                            title="What Makes ATREUS PHYSIO Different"
                            description="Combining clinical expertise with patient education for lasting results. We believe in a science-driven, assessment-first approach that puts you in control of your recovery."
                            linkText="Learn More About Us"
                            linkHref="/about"
                        />
                    </AnimatedSection>
                </div>
            </section>

            {/* Founders Section */}
            {data.founders && (
                <section className="py-24 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <AnimatedSection>
                            <SectionHeader
                                title="Meet Your Therapist"
                                description="Experienced professionals dedicated to your recovery and wellness journey."
                                linkText="View Full Profile"
                                linkHref="/about"
                            />
                        </AnimatedSection>

                        <div className="max-w-6xl mx-auto mt-12">
                            {data.founders.map((founder: any, i: number) => (
                                <div key={i} className="flex flex-col lg:flex-row gap-16 items-start">
                                    <AnimatedSection delay={0.2} className="w-full lg:w-1/3 shrink-0">
                                        <div className="aspect-[3/4] rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-xl relative group">
                                            {/* Image placeholder */}
                                            <div className="absolute inset-0 bg-slate-300 dark:bg-slate-600 group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 text-white">
                                                <h3 className="text-xl font-bold">{founder.name}</h3>
                                                <p className="text-[#e3171e] text-sm">{founder.role}</p>
                                                <p className="text-slate-300 dark:text-slate-200 text-xs mt-1">{founder.qualifications}</p>
                                            </div>
                                        </div>
                                    </AnimatedSection>

                                    <div className="w-full lg:w-2/3">
                                        <AnimatedSection delay={0.3}>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Experience & Clinical Interests</h3>
                                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                                {founder.shortBio || founder.bio}
                                            </p>
                                        </AnimatedSection>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {/* Booking Form Section */}
            {data.forms?.bookingForm && (
                <section className="py-24 px-4 md:px-8 dark:bg-slate-900 relative overflow-hidden">
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
