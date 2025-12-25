
import { NextRequest, NextResponse } from 'next/server';
import { indexAllPages } from '@/lib/google-indexing';

export async function POST(req: NextRequest) {
    try {
        // Basic security check (you might want to add a proper secret key)
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.INDEXING_SECRET_KEY}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await indexAllPages();
        return NextResponse.json({ success: true, message: 'Indexing requested for all key pages' });
    } catch (error) {
        console.error('Indexing API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
