import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImageOptim } from "@/components/ui/ImageOptim";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("about");
    if (!data) return {};

    return {
        title: data.seo.metaTitle,
        description: data.seo.metaDescription,
        keywords: data.seo.keywords || ["Physiotherapy", "Chennai", "Rehab"],
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
        <main className="min-h-screen">
            <JsonLd pageId="about" />

            {/* Hero */}
            <section className="relative py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                                {data.hero.title}
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                {data.hero.subtitle}
                            </p>
                        </div>
                        <ImageOptim
                            src={data.hero.image.src}
                            alt={data.hero.image.alt}
                            width={800}
                            height={600}
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20">
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <p className="text-lg text-slate-700 mb-12 leading-relaxed">
                        {data.content.intro}
                    </p>

                    <div className="grid grid-cols-3 gap-8 text-center mb-20">
                        {data.content.stats.map((stat: any, i: number) => (
                            <div key={i} className="p-6 bg-slate-900 text-white rounded-xl">
                                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Founders */}
                    {data.founders && (
                        <div className="space-y-16">
                            <h2 className="text-3xl font-bold text-center mb-8">Leadership</h2>
                            {data.founders.map((founder: any, i: number) => (
                                <div key={i} className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="w-48 h-48 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                                        {/* Image placeholder */}
                                        <div className="w-full h-full bg-slate-300" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-slate-900">{founder.name}</h3>
                                        <div className="text-blue-600 font-medium mb-2">{founder.role}</div>
                                        <p className="text-slate-600 leading-relaxed">{founder.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
