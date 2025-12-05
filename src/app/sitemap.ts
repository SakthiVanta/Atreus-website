import { MetadataRoute } from 'next';
import { getPageContent } from '@/lib/content';

/**
 * Dynamic Sitemap Generator for Next.js App Router
 * Automatically generates sitemap.xml at /sitemap.xml
 * Following Google's latest SEO best practices (2024-2025)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://atreusphysio.com';

    // Static pages with SEO priority and update frequency
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0, // Homepage - highest priority
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/courses`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/podcasts`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Dynamic SEO pages from dynamic-pages.json
    let dynamicSEOPages: MetadataRoute.Sitemap = [];
    try {
        const fs = require('fs').promises;
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data/locales/en/dynamic-pages.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents);

        if (data.pages) {
            dynamicSEOPages = data.pages.map((page: any) => ({
                url: `${baseUrl}/${page.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8, // High priority for SEO keyword pages
            }));
        }
    } catch (error) {
        console.log('No dynamic SEO pages found');
    }

    // Individual course pages
    let coursePages: MetadataRoute.Sitemap = [];
    try {
        const coursesData = await getPageContent('courses');
        if (coursesData?.courseList) {  // Fixed: use courseList not courses
            coursePages = coursesData.courseList.map((course: any) => ({
                url: `${baseUrl}/courses/${course.slug || course.id}`,  // Use slug for SEO
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }));
        }
    } catch (error) {
        console.log('No courses found');
    }

    // Combine all pages (removed podcast episodes as requested)
    return [
        ...staticPages,
        ...dynamicSEOPages,
        ...coursePages,
    ];
}
