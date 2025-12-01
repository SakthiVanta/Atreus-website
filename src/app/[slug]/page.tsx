import { getPageContent, getSlugs } from "@/lib/content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = await getSlugs();
    return slugs.map((route: any) => ({
        slug: route.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    // In a real scenario, we'd fetch specific page content based on slug.
    // For now, we'll try to find a matching JSON file or fallback.
    // Since we don't have individual JSONs for every slug in this demo,
    // we'll simulate it or just return basic metadata.

    // TODO: Implement specific content loading for each slug
    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} | AtreusPhysio`,
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const slugs = await getSlugs();
    const route = slugs.find((r: any) => r.slug === slug);

    if (!route) {
        notFound();
    }

    return (
        <main className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <JsonLd pageId={slug} />
            <h1 className="text-4xl font-bold mb-6 capitalize">
                {slug.replace(/-/g, " ")}
            </h1>
            <div className="prose lg:prose-xl">
                <p className="text-slate-600">
                    This is a dynamically generated page for <strong>{slug}</strong>.
                    Type: {route.type}
                </p>
                <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <h2 className="text-2xl font-semibold mb-4">Content Placeholder</h2>
                    <p>
                        The content for this page would be loaded from
                        <code>data/locales/en/{slug}.json</code> in a full implementation.
                    </p>
                </div>
            </div>
        </main>
    );
}
