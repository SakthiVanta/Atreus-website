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
        legal: []
    };

    return (
        <footer className="bg-slate-100 dark:bg-[#06113d] text-slate-900 dark:text-white">
            {/* Main Footer */}
            <div className="container px-4 md:px-8 mx-auto max-w-7xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                    {/* Brand */}
                    <div className="space-y-6 lg:col-span-2">
                        <Image
                            src="/images/logo.webp"
                            alt="AtreusPhysio Logo"
                            width={200}
                            height={80}
                            className="h-16 w-auto object-contain bg-white px-3 py-2 rounded-full"
                        />
                        <p className="text-slate-600 dark:text-slate-300 max-w-sm">
                            Reborn to move fearless. Science-driven rehabilitation and performance training in Trichy.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href={contactInfo.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href={contactInfo.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0077b5] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href={`https://wa.me/${contactInfo.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-500 transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-6 text-slate-900 dark:text-white">Explore</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
                            {footerLinks.quickLinks.map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-[#e3171e] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold mb-6 text-slate-900 dark:text-white">Services</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
                            {footerLinks.services.map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-[#e3171e] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Conditions */}
                    <div>
                        <h3 className="font-semibold mb-6 text-slate-900 dark:text-white">Conditions</h3>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
                            {footerLinks.conditions.map((link: any, i: number) => (
                                <li key={i}>
                                    <Link href={link.href} className="hover:text-[#e3171e] transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-6 text-slate-900 dark:text-white">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-200">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#e3171e] shrink-0 mt-0.5" />
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#e3171e] shrink-0" />
                                <a href={`tel:${contactInfo.phone}`} className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#e3171e] shrink-0" />
                                <a href={`mailto:${contactInfo.email}`} className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors">
                                    {contactInfo.email}
                                </a>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <a
                                href={`https://wa.me/${contactInfo.whatsapp}?text=Hi, I'd like to book an appointment.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#e3171e] hover:bg-[#c41218] rounded-lg text-white text-sm font-medium transition-colors"
                            >
                                <FaWhatsapp className="w-4 h-4" />
                                Book Appointment
                            </a>
                        </div>
                    </div>
                </div >
            </div >

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
