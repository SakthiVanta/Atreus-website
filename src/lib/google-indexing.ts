import { google } from 'googleapis';

/**
 * Utility to trigger Google Indexing API
 * This requires a Google Cloud Service Account with "Indexing API" enabled.
 * Credentials should be stored in environment variables.
 */

const SCOPES = ['https://www.googleapis.com/auth/indexing'];

export async function requestIndexing(url: string) {
    try {
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

        if (!clientEmail || !privateKey) {
            console.warn('Google Start Indexing Skipped: Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY env variables.');
            return null;
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: SCOPES,
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        const options = {
            url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken.token}`,
            },
            body: JSON.stringify({
                url: url,
                type: 'URL_UPDATED',
            }),
        };

        const response = await fetch(options.url, {
            method: 'POST',
            headers: options.headers as any,
            body: options.body,
        });

        const result = await response.json();
        console.log('Indexing request sent for:', url, result);
        return result;
    } catch (error) {
        console.error('Error requesting indexing:', error);
        return null;
    }
}

/**
 * Batch update all key pages
 */

import fs from 'fs';
import path from 'path';
import { conditions } from '@/data/conditions';

/**
 * Batch update all key pages
 * Dynamically crawls project data to find all valid URLs
 */
export async function indexAllPages() {
    const baseUrl = 'https://www.atreusphysio.com';
    const urlsToCrawl: string[] = [
        baseUrl,
        `${baseUrl}/about`,
        `${baseUrl}/services`,
        `${baseUrl}/conditions`,
        `${baseUrl}/methodology`,
        `${baseUrl}/courses`,
        `${baseUrl}/podcasts`,
        `${baseUrl}/contact`,
        `${baseUrl}/developers`,
    ];

    try {
        // 1. Add Conditions
        conditions.forEach(condition => {
            urlsToCrawl.push(`${baseUrl}/conditions/${condition.slug}`);
        });

        // 2. Add Services & Team (from homepage.json)
        const homepagePath = path.join(process.cwd(), 'data/locales/en/homepage.json');
        if (fs.existsSync(homepagePath)) {
            const homepageData = JSON.parse(fs.readFileSync(homepagePath, 'utf8'));

            if (homepageData.services) {
                homepageData.services.forEach((service: any) => {
                    urlsToCrawl.push(`${baseUrl}/services/${service.slug || service.id}`);
                });
            }

            // Explicitly adding the team member page we know exists
            urlsToCrawl.push(`${baseUrl}/team/dr-swatheeshwaran`);
        }

        // 3. Add Dynamic SEO Pages
        const dynamicPath = path.join(process.cwd(), 'data/locales/en/dynamic-pages.json');
        if (fs.existsSync(dynamicPath)) {
            const dynamicData = JSON.parse(fs.readFileSync(dynamicPath, 'utf8'));
            if (dynamicData.pages) {
                dynamicData.pages.forEach((page: any) => {
                    urlsToCrawl.push(`${baseUrl}/${page.slug}`);
                });
            }
        }

        // Deduplicate URLs
        const uniqueUrls = Array.from(new Set(urlsToCrawl));

        console.log(`Starting indexing for ${uniqueUrls.length} pages...`);

        type PromiseResult = { status: 'fulfilled'; value: any } | { status: 'rejected'; reason: any };
        const results = await Promise.allSettled(uniqueUrls.map(url => requestIndexing(url)));

        const successCount = results.filter(r => r.status === 'fulfilled' && (r as any).value !== null).length;
        console.log(`Indexing Complete. Successfully requested: ${successCount}/${uniqueUrls.length}`);

    } catch (error) {
        console.error('Error constructing URL list for indexing:', error);
    }
}
