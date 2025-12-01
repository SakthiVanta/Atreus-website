import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate body here (e.g., using Zod)
        if (!body.fullName || !body.email || !body.phone) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Simulate DB/Email delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would send email or save to DB
        console.log("Booking received:", body);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
