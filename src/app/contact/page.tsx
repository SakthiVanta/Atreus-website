import { getPageContent } from "@/lib/content";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getPageContent("contact");
    if (!data) return {};

    return {
        title: data.seo.metaTitle,
        description: data.seo.metaDescription,
        openGraph: {
            title: data.seo.ogTitle,
            description: data.seo.ogDescription,
            images: [data.seo.ogImage],
        },
    };
}

export default async function ContactPage() {
    const data = await getPageContent("contact");

    if (!data) return <div>Error loading content</div>;

    return (
        <main className="min-h-screen py-20">
            <JsonLd pageId="contact" />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Info */}
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-6">
                            {data.info.title}
                        </h1>
                        <p className="text-lg text-slate-600 mb-12">
                            {data.info.description}
                        </p>

                        <div className="space-y-8">
                            {data.info.details.map((detail: any, i: number) => (
                                <div key={i}>
                                    <h3 className="font-semibold text-slate-900 mb-1">
                                        {detail.label}
                                    </h3>
                                    <a
                                        href={detail.href}
                                        className="text-lg text-blue-600 hover:underline"
                                    >
                                        {detail.value}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                        <h2 className="text-2xl font-bold mb-6">{data.form.title}</h2>
                        <form className="space-y-4">
                            {data.form.fields.map((field: any) => (
                                <div key={field.name} className="flex flex-col gap-1">
                                    <label htmlFor={field.name} className="text-sm font-medium text-slate-700">
                                        {field.label} {field.required && "*"}
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            required={field.required}
                                            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[120px]"
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.name}
                                            name={field.name}
                                            required={field.required}
                                            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                                        />
                                    )}
                                </div>
                            ))}
                            <Button type="submit" className="w-full">
                                {data.form.submit.text}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
