import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import templates from "@/data/email-templates.json";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Only require fullName and phone (email and preferredDate are optional)
        if (!body.fullName || !body.phone) {
            return NextResponse.json(
                {
                    error: "Missing required fields",
                    message: "Please provide your name and phone number"
                },
                { status: 400 }
            );
        }

        // Validate phone number format (basic check)
        if (body.phone.length < 10) {
            return NextResponse.json(
                {
                    error: "Invalid phone number",
                    message: "Please provide a valid 10-digit phone number"
                },
                { status: 400 }
            );
        }

        // Get homepage template
        const template = (templates as any)["homepage"];

        if (!template) {
            console.error("Template 'homepage' not found in email-templates.json. Available keys:", Object.keys(templates));
            return NextResponse.json(
                {
                    error: "Internal Server Error",
                    message: "Email template configuration error"
                },
                { status: 500 }
            );
        }

        // Prepare email data with timestamp
        const emailData = {
            ...body,
            page: "Homepage",
            timestamp: new Date().toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
                timeZone: 'Asia/Kolkata'
            })
        };

        // Replace placeholders
        let html = template.html;
        let subject = template.subject;
        Object.keys(emailData).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, "g");
            html = html.replace(regex, emailData[key] || "N/A");
            subject = subject.replace(regex, emailData[key] || "N/A");
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
            replyTo: emailData.email || emailData.phone,
        });

        return NextResponse.json({
            success: true,
            message: "Booking request received! We'll contact you shortly."
        });
    } catch (error) {
        console.error("Booking API error:", error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                message: "Something went wrong. Please try again."
            },
            { status: 500 }
        );
    }
}
