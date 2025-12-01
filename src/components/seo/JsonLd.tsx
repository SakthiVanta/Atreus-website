import { getPageContent } from "@/lib/content";

export async function JsonLd({ pageId }: { pageId: string }) {
    const data = await getPageContent(pageId);

    if (!data?.seo?.structuredData) {
        return null;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data.seo.structuredData),
            }}
        />
    );
}
