import { Metadata } from "next";
import { conditions } from "@/data/conditions";
import { ConditionCard } from "@/components/conditions/ConditionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
    title: "Conditions We Treat | Atreus Physio",
    description: "Explore our comprehensive guide to musculoskeletal conditions. Learn about symptoms, causes, and our science-driven treatment approach.",
};

export default function ConditionsPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <SectionHeader
                    title="Conditions We Treat"
                    description="We believe an informed patient recovers faster. Browse our library of conditions to understand your body better."
                    className="mb-16 text-center mx-auto [&>div]:items-center [&>div]:text-center [&_p]:mx-auto"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conditions.map((condition) => (
                        <ConditionCard key={condition.id} condition={condition} collapsible={false} />
                    ))}
                </div>
            </div>
        </main>
    );
}
