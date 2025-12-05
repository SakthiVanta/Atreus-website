import { Metadata } from "next";

/**
 * Generate standardized metadata for all pages
 * Ensures consistent SEO implementation across the application
 */
export function generateStandardMetadata(seoData: any): Metadata {
    if (!seoData) return {};

    return {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        keywords: seoData.keywords,
        authors: [{ name: "AtreusPhysio" }],
        publisher: "AtreusPhysio",
        alternates: {
            canonical: seoData.canonical,
        },
        robots: {
            index: seoData.robots?.includes("index"),
            follow: seoData.robots?.includes("follow"),
        },
        openGraph: {
            title: seoData.ogTitle,
            description: seoData.ogDescription,
            images: [seoData.ogImage],
            url: seoData.canonical,
            type: seoData.ogType || "website",
            siteName: seoData.ogSiteName || "AtreusPhysio",
            locale: seoData.ogLocale || "en_IN",
        },
        twitter: {
            card: seoData.twitterCard || "summary_large_image",
            title: seoData.twitterTitle || seoData.ogTitle,
            description: seoData.twitterDescription || seoData.ogDescription,
            images: [seoData.twitterImage || seoData.ogImage],
        },
    };
}

/**
 * Validate SEO data for completeness and optimal formatting
 */
export function validateSEOData(seoData: any): { valid: boolean; warnings: string[] } {
    const warnings: string[] = [];

    // Check title length (50-60 chars ideal)
    if (seoData.metaTitle) {
        const titleLength = seoData.metaTitle.length;
        if (titleLength < 30) {
            warnings.push(`Title too short (${titleLength} chars). Recommended: 50-60 chars.`);
        } else if (titleLength > 70) {
            warnings.push(`Title too long (${titleLength} chars). May be truncated in search results.`);
        }
    } else {
        warnings.push("Missing meta title");
    }

    // Check description length (150-160 chars ideal)
    if (seoData.metaDescription) {
        const descLength = seoData.metaDescription.length;
        if (descLength < 120) {
            warnings.push(`Description too short (${descLength} chars). Recommended: 150-160 chars.`);
        } else if (descLength > 160) {
            warnings.push(`Description too long (${descLength} chars). May be truncated.`);
        }
    } else {
        warnings.push("Missing meta description");
    }

    // Check for required fields
    if (!seoData.keywords || seoData.keywords.length === 0) {
        warnings.push("Missing keywords array");
    }
    if (!seoData.canonical) warnings.push("Missing canonical URL");
    if (!seoData.ogImage) warnings.push("Missing OpenGraph image");

    return {
        valid: warnings.length === 0,
        warnings,
    };
}

/**
 * Generate structured data script tag
 */
export function generateStructuredDataScript(structuredData: any): string {
    return JSON.stringify(structuredData);
}
