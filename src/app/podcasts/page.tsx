import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { generateStandardMetadata } from "@/lib/seo-utils";
import { PodcastsClientPage } from "@/components/podcasts/PodcastsClientPage";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("podcasts");
    if (!data) return {};

    return generateStandardMetadata(data.seo);
}

export default async function PodcastsPage() {
    const data = await getPageContent("podcasts");

    if (!data) {
        return <div>Error loading content</div>;
    }

    return (
        <>
            {/* Structured Data JSON-LD */}
            {data.seo.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data.seo.structuredData) }}
                />
            )}
            <PodcastsClientPage data={data} />
        </>
    );
}
