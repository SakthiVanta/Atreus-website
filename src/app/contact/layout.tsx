import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { generateStandardMetadata } from "@/lib/seo-utils";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("contact");
    if (!data) return {};

    return generateStandardMetadata(data.seo);
}

export default async function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const data = await getPageContent("contact");

    return (
        <>
            {/* Structured Data JSON-LD */}
            {data?.seo?.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data.seo.structuredData) }}
                />
            )}
            {children}
        </>
    );
}
