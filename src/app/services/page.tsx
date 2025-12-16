import { Metadata } from "next";
import { getPageContent } from "@/lib/content";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { generateStandardMetadata } from "@/lib/seo-utils";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("homepage");
    if (!data?.seo?.pagesSeo?.services) return {};
    return generateStandardMetadata(data.seo.pagesSeo.services);
}

export default async function ServicesPage() {
    const data = await getPageContent("homepage");

    if (!data || !data.services) {
        return <div>Error loading services</div>;
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeader
                    title="Our Services"
                    description="We offer a wide range of specialized treatments tailored to your unique needs. Our evidence-based approach ensures you receive the most effective care for your condition."
                    className="mb-16 text-center mx-auto [&>div]:items-center [&>div]:text-center [&_p]:mx-auto"
                />

                <ServicesGrid services={data.services} />
            </div>
        </main>
    );
}
