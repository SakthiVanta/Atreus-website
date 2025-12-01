import fs from 'fs/promises';
import path from 'path';

const LOCALE = 'en'; // Defaulting to 'en' for now as per instructions
const DATA_DIR = path.join(process.cwd(), 'data/locales', LOCALE);

export async function getPageContent(pageId: string) {
    try {
        const filePath = path.join(DATA_DIR, `${pageId}.json`);
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error(`Error reading content for page ${pageId}:`, error);
        return null;
    }
}

export async function getSlugs() {
    try {
        const filePath = path.join(process.cwd(), 'data/routes/slugs.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents);
        return data.routes || [];
    } catch (error) {
        console.error('Error reading slugs:', error);
        return [];
    }
}
