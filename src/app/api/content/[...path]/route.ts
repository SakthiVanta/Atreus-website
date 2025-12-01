import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path: pathSegments } = await params;
    const filePath = path.join(process.cwd(), 'data/locales/en', ...pathSegments);

    // Ensure we add .json if missing
    const finalPath = filePath.endsWith('.json') ? filePath : `${filePath}.json`;

    try {
        const fileContents = await fs.readFile(finalPath, 'utf8');
        return NextResponse.json(JSON.parse(fileContents));
    } catch (error) {
        return NextResponse.json(
            { error: 'Content not found' },
            { status: 404 }
        );
    }
}
