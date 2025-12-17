import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Phone, MapPin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getPageContent } from "@/lib/content";

const contactInfo = {
    phone: "+91 7010294784",
    whatsapp: "+917010294784",
    email: "contact@atreusphysio.com",
    address: "Kamaraj Complex, 46A, EVR Rd, Tiruchirappalli",
    social: {
        instagram: "https://www.instagram.com/atreus_physio",
        linkedin: "https://www.linkedin.com/in/swatheeshwaran-mpt-sports-018566274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    }
};

export async function Footer() {
    const data = await getPageContent("homepage");
    const footerLinks = data?.footer || {
        quickLinks: [],
        services: [],
        conditions: [],
        links: [],
        legal: []
    };

    return (
        <footer className="bg-slate-100 dark:bg-[#06113d] text-slate-900 dark:text-white">
            {/* Main Footer */}
            {/* Main Footer */}
            <div className="container px-4 md:px-8 mx-auto max-w-7xl py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand & Contact - Spans full width on mobile, 1 col on others */}
                    <div className="space-y-6 md:col-span-2 lg:col-span-1 xl:col-span-1">
                        <Link href="/" className="block">
                            <Image
                                src="/images/logo.webp"
                                alt="AtreusPhysio Logo"
                                width={200}
                                height={80}
                                className="h-12 md:h-14 w-auto object-contain bg-white px-3 py-2 rounded-lg shadow-sm"
                            />
                        </Link>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xs">
                            Reborn to move fearless. Science-driven rehabilitation and performance training in Trichy.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <MapPin className="w-5 h-5 text-[#e3171e] shrink-0 mt-0.5" />
                                <span>{contactInfo.address}</span>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <a
                                    href={contactInfo.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href={contactInfo.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a
                                    href={`https://wa.me/${contactInfo.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Site Navigation */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 md:mb-6 text-slate-900 dark:text-white">Explore</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                            {footerLinks.quickLinks.map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-[#e3171e] hover:translate-x-1 transition-all duration-200 inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 md:mb-6 text-slate-900 dark:text-white">Services</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                            {footerLinks.services.slice(0, 8).map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-[#e3171e] hover:translate-x-1 transition-all duration-200 inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Conditions */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 md:mb-6 text-slate-900 dark:text-white">Conditions</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                            {footerLinks.conditions.slice(0, 8).map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-[#e3171e] hover:translate-x-1 transition-all duration-200 inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Access / More Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 md:mb-6 text-slate-900 dark:text-white">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                            {footerLinks.links?.slice(0, 5).map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-[#e3171e] hover:translate-x-1 transition-all duration-200 inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/10">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">Book Now</p>
                            <div className="space-y-3">
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-[#e3171e] transition-colors"
                                >
                                    <Phone className="w-4 h-4 text-[#e3171e]" />
                                    {contactInfo.phone}
                                </a>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#e3171e] transition-colors"
                                >
                                    <Mail className="w-4 h-4 text-[#e3171e]" />
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-300 dark:border-white/10">
                <div className="container px-4 md:px-8 mx-auto max-w-7xl py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            © {new Date().getFullYear()} ATREUS PHYSIO. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
                            {footerLinks.legal && footerLinks.legal.map((link: any, i: number) => (
                                <Link key={i} href={link.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </footer >
    );
}
