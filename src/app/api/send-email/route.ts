import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import templates from "@/data/email-templates.json";

export async function POST(request: Request) {
    try {
        console.log("---- SMTP DEBUG ----");
        console.log("HOST:", process.env.SMTP_HOST);
        console.log("PORT:", process.env.SMTP_PORT);
        console.log("USER:", process.env.SMTP_USER);
        console.log("---------------------");

        const body = await request.json();
        const { type = "general", ...data } = body;

        // Validate required fields
        if (!data.name || !data.email || !data.phone) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get template
        const template = (templates as any)[type];
        if (!template) {
            return NextResponse.json(
                { error: "Invalid template type" },
                { status: 400 }
            );
        }

        // Replace placeholders
        let html = template.html;
        let subject = template.subject;
        Object.keys(data).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, "g");
            html = html.replace(regex, data[key]);
            subject = subject.replace(regex, data[key]);
        });

        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: "developer@physiolaxy.com",
            subject: subject,
            html: html,
            replyTo: data.email,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
