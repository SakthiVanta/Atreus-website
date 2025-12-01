import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BookingForm } from "@/components/sections/BookingForm";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

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

            {/* Value Props */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            The Atreus Approach
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                            Combining clinical expertise with patient education for lasting results.
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

            {/* Founders Section */}
            {data.founders && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <AnimatedSection className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Meet the Experts
                            </h2>
                            <p className="text-slate-600">Led by visionaries in the field of physiotherapy.</p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                            {data.founders.map((founder: any, i: number) => (
                                <AnimatedSection key={i} delay={i * 0.2} className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-200 shrink-0 overflow-hidden border-4 border-white shadow-lg">
                                        {/* Image would go here */}
                                        <div className="w-full h-full bg-slate-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">{founder.name}</h3>
                                        <div className="text-blue-600 font-medium mb-2">{founder.role}</div>
                                        <div className="text-xs font-bold bg-slate-100 inline-block px-2 py-1 rounded mb-3 text-slate-700">{founder.qualifications}</div>
                                        <p className="text-slate-600 text-sm leading-relaxed">{founder.bio}</p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Section */}
            {data.services && <ServicesGrid services={data.services} />}

            {/* Testimonials Section */}
            {data.testimonials && <Testimonials testimonials={data.testimonials} />}

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
