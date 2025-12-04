import { NextRequest, NextResponse } from "next/server";
import { getPageContent } from "@/lib/content";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const pageId = searchParams.get("pageId");

        if (!pageId) {
            return NextResponse.json(
                { error: "Missing pageId parameter" },
                { status: 400 }
            );
        }

        const data = await getPageContent(pageId);

        if (!data) {
            return NextResponse.json(
                { error: "Page not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching page content:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
