import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";
import { FloatingCTA } from "@/components/ui/FloatingCTA";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "AtreusPhysio",
    description: "Recover Faster, Move Better.",
    metadataBase: new URL("https://atreusphysio.in"),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                <Providers>
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
