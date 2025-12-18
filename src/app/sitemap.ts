import { MetadataRoute } from 'next';
import { getPageContent } from '@/lib/content';
import { conditions } from '@/data/conditions';

/**
 * Dynamic Sitemap Generator for Next.js App Router
 * Automatically generates sitemap.xml at /sitemap.xml
 * Following Google's latest SEO best practices (2024-2025)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.atreusphysio.com';

    // Static pages with SEO priority and update frequency
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/conditions`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/methodology`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
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
        {
            url: `${baseUrl}/developers`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic SEO pages
    let dynamicSEOPages: MetadataRoute.Sitemap = [];
    try {
        // Direct file reading as fallback or primary method for this specific file
        console.log('Attempting to read dynamic-pages.json');
        const fs = require('fs').promises;
        const path = require('path');
        const filePath = path.join(process.cwd(), 'data/locales/en/dynamic-pages.json');

        try {
            const fileContents = await fs.readFile(filePath, 'utf8');
            const data = JSON.parse(fileContents);
            // Verify structure
            if (data && Array.isArray(data.pages)) {
                console.log(`Found ${data.pages.length} dynamic pages`);
                dynamicSEOPages = data.pages.map((page: any) => ({
                    url: `${baseUrl}/${page.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                }));
            } else {
                console.log('Invalid format for dynamic-pages.json');
            }
        } catch (readError) {
            console.error('Failed to read dynamic-pages.json:', readError);
        }
    } catch (error) {
        console.error('Error processing dynamic SEO pages logic', error);
    }

    // 1. Services Pages & Team Pages (from homepage.json)
    let servicePages: MetadataRoute.Sitemap = [];
    let teamPages: MetadataRoute.Sitemap = [];
    try {
        const homepageData = await getPageContent('homepage');

        if (homepageData?.services) {
            servicePages = homepageData.services.map((service: any) => ({
                url: `${baseUrl}/services/${service.slug || service.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            }));
        }

        if (homepageData?.founders) {
            teamPages = homepageData.founders.map((founder: any) => {
                // Explicitly matching the manual link established earlier
                return {
                    url: `${baseUrl}/team/dr-swatheeshwaran`,
                    lastModified: new Date(),
                    changeFrequency: 'monthly' as const,
                    priority: 0.8,
                };
            });
            // Deduplicate
            teamPages = Array.from(new Set(teamPages.map(p => p.url))).map(url => teamPages.find(p => p.url === url)!);
        }

    } catch (error) {
        console.log('Error fetching homepage data for sitemap');
    }

    // 2. Conditions Pages (from src/data/conditions.ts)
    const conditionsSitemap: MetadataRoute.Sitemap = conditions.map((condition) => ({
        url: `${baseUrl}/conditions/${condition.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Course Pages
    let coursePages: MetadataRoute.Sitemap = [];
    try {
        const coursesData = await getPageContent('courses');
        if (coursesData?.courseList) {
            coursePages = coursesData.courseList.map((course: any) => ({
                url: `${baseUrl}/courses/${course.slug || course.id}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }));
        }
    } catch (error) {
        console.log('No courses found');
    }

    return [
        ...staticPages,
        ...dynamicSEOPages,
        ...servicePages,
        ...teamPages,
        ...conditionsSitemap,
        ...coursePages,
    ];
}
