"use client";

import Link from "next/link";
import { Instagram, Linkedin, Phone, MapPin, Mail, MessageCircle } from "lucide-react";

const contactInfo = {
    phone: "+91 7010294784",
    whatsapp: "+917010294784",
    email: "contact@atreusphysio.com",
    address: "Kamaraj Complex, 46A, EVR Rd, Tiruchirappalli",
    social: {
        instagram: "https://www.instagram.com/atreus_physio",
        linkedin: "https://www.linkedin.com/company/atreus-physio/",
    }
};

export function Footer() {
    return (
        <footer className="bg-[#06113d] text-white">
            {/* Main Footer */}
            <div className="container px-4 md:px-8 mx-auto max-w-7xl py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-2xl font-bold tracking-tight">
                                ATREUS <span className="text-[#e3171e]">PHYSIO</span>
                            </span>
                            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                                Recover Faster. Move Better. Live Stronger. Your trusted partner for physiotherapy and rehabilitation in Tiruchirappalli.
                            </p>
                        </div>

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
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li>
                                <Link href="/" className="hover:text-[#e3171e] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-[#e3171e] transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="hover:text-[#e3171e] transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-[#e3171e] transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white">Our Services</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li>
                                <Link href="/services/sports-rehab" className="hover:text-[#e3171e] transition-colors">
                                    Sports Rehabilitation
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/orthopedic" className="hover:text-[#e3171e] transition-colors">
                                    Orthopedic Physiotherapy
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/neurological" className="hover:text-[#e3171e] transition-colors">
                                    Neurological Rehab
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/geriatric" className="hover:text-[#e3171e] transition-colors">
                                    Geriatric Care
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#e3171e] shrink-0 mt-0.5" />
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#e3171e] shrink-0" />
                                <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#e3171e] shrink-0" />
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
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
                                <MessageCircle className="w-4 h-4" />
                                Book Appointment
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container px-4 md:px-8 mx-auto max-w-7xl py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400">
                            © {new Date().getFullYear()} ATREUS PHYSIO. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-slate-400">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
