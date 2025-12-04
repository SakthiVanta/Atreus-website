import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, courseTitle, coursePrice } = body;

        // Validate required fields
        if (!name || !email || !phone || !courseTitle) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create booking object
        const booking = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            courseTitle,
            coursePrice,
            timestamp: new Date().toISOString(),
            status: "pending",
        };

        // Path to data directory and file
        const dataDir = path.join(process.cwd(), "data");
        const bookingsFile = path.join(dataDir, "bookings.json");

        // Ensure data directory exists
        if (!existsSync(dataDir)) {
            await mkdir(dataDir, { recursive: true });
        }

        // Read existing bookings or create new array
        let bookings = [];
        if (existsSync(bookingsFile)) {
            const fileContent = await readFile(bookingsFile, "utf-8");
            bookings = JSON.parse(fileContent);
        }

        // Add new booking
        bookings.push(booking);

        // Write back to file
        await writeFile(bookingsFile, JSON.stringify(bookings, null, 2), "utf-8");

        return NextResponse.json(
            { success: true, booking },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing booking:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
