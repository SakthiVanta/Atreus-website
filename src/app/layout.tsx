import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "AtreusPhysio",
    description: "Recover Faster, Move Better. Science-driven physiotherapy care in Trichy.",
    metadataBase: new URL("https://www.atreusphysio.com"),

    // Favicon and icons configuration
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/icon.png', type: 'image/png', sizes: '32x32' },
            { url: '/icon.svg', type: 'image/svg+xml' },
        ],
        apple: [
            { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
    },

    // Open Graph metadata for social media sharing
    openGraph: {
        title: "AtreusPhysio",
        description: "Recover Faster, Move Better. Science-driven physiotherapy care in Trichy.",
        url: "https://www.atreusphysio.com",
        siteName: "AtreusPhysio",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AtreusPhysio - Science-driven physiotherapy care",
            },
        ],
    },

    // Twitter Card metadata
    twitter: {
        card: "summary_large_image",
        title: "AtreusPhysio",
        description: "Recover Faster, Move Better. Science-driven physiotherapy care in Trichy.",
        images: ["/og-image.png"],
    },

    // Additional metadata for search engines
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Atreus Physio",
        "url": "https://www.atreusphysio.com",
        "logo": "https://www.atreusphysio.com/images/google-logo-square.png",
        "sameAs": [
            "https://www.linkedin.com/in/swatheeshwaran-mpt-sports-018566274"
        ]
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
                suppressHydrationWarning
            >
                <Providers>
                    <Analytics />
                    <Header />
                    <div className="">
                        {children}
                    </div>
                    <Footer />
                    <FloatingCTA />
                </Providers>
            </body>
        </html>
    );
}
