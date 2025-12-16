"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    MapPin, Phone, Mail, Clock, Instagram, Linkedin, Navigation, ChevronRight, Sparkles,
    Calendar, Send, Loader2
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";

const contactInfo = {
    address: {
        line1: "Kamaraj Complex, 46A",
        line2: "EVR Rd, Mahalakshmi Nagar, Sathanur",
        city: "Tiruchirappalli, Tamil Nadu 620021",
        mapUrl: "https://www.google.com/maps/place/ATREUS+Physio/@10.8165088,78.6899661,17z",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0!2d78.6899661!3d10.8165088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ4JzU5LjQiTiA3OMKwNDEnMjMuOSJF!5e0!3m2!1sen!2sin!4v1701700000000!5m2!1sen!2sin"
    },
    phone: "+91 7010294784",
    whatsapp: "+917010294784",
    email: "contact@atreusphysio.com",
    hours: [
        { day: "Monday", time: "8:30 AM – 9:00 PM", isOpen: true },
        { day: "Tuesday", time: "8:30 AM – 9:00 PM", isOpen: true },
        { day: "Wednesday", time: "8:30 AM – 9:00 PM", isOpen: true },
        { day: "Thursday", time: "8:30 AM – 9:00 PM", isOpen: true },
        { day: "Friday", time: "8:30 AM – 9:00 PM", isOpen: true },
        { day: "Saturday", time: "8:30 AM – 9:00 PM", isOpen: true },
        { day: "Sunday", time: "Closed", isOpen: false },
    ],
    social: {
        instagram: "https://www.instagram.com/atreus_physio",
        linkedin: "https://www.linkedin.com/in/swatheeshwaran-mpt-sports-018566274?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function QuickActionButton({ href, icon: Icon, label, iconColor, isExternal = true }: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    iconColor: string;
    isExternal?: boolean;
}) {
    return (
        <motion.a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 shadow-sm hover:shadow-lg transition-all duration-300"
        >
            <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>
        </motion.a>
    );
}

function ContactCard({ icon: Icon, title, children, delay = 0 }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group bg-white dark:bg-slate-800 rounded-2xl p-6  border-2 border-slate-100 dark:border-slate-700 hover:border-[#e3171e]/20 hover:shadow-lg transition-all duration-300"
        >
            <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 text-[#06113d] dark:text-[#e3171e] group-hover:bg-[#06113d] group-hover:text-white dark:group-hover:bg-[#e3171e] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

function SocialButton({ href, icon: Icon, label, hoverColor }: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    hoverColor: string;
}) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 ${hoverColor} transition-all duration-300`}
            title={label}
        >
            <Icon className="w-5 h-5" />
        </motion.a>
    );
}

export default function ContactPage() {
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('loading');
        const loadingToast = toast.loading("Sending your message...", { id: "contact-toast" });

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    type: 'contact',
                    page: 'Contact Page',
                    timestamp: new Date().toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                        timeZone: 'Asia/Kolkata'
                    })
                })
            });

            const result = await response.json();

            if (response.ok) {
                setFormState('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                toast.success("Message sent successfully! We'll get back to you soon.", { id: "contact-toast" });
                setFormState('idle');
            } else {
                throw new Error(result.message || "Failed to send message");
            }
        } catch (error: any) {
            console.error('Form submission error:', error);
            setFormState('idle');
            toast.error(error.message || "Something went wrong. Please try again.", { id: "contact-toast" });
        }
    };

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const currentHour = new Date().getHours();
    const isCurrentlyOpen = currentHour >= 8 && currentHour < 21;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#06113d] via-[#06113d] to-[#0a1a5c] text-white py-32 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#e3171e]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#e3171e]/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4 text-[#e3171e]" />
                            Get in Touch
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Contact <span className="text-[#e3171e]">ATREUS PHYSIO</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                            Ready to start your recovery journey? Reach out to us today and take the first step towards better health.
                        </p>

                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isCurrentlyOpen
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${isCurrentlyOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                            {isCurrentlyOpen ? 'Open Now' : 'Currently Closed'} · Opens 8:30 AM
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="relative z-20 -mt-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        <QuickActionButton
                            href={`tel:${contactInfo.phone}`}
                            icon={Phone}
                            label="Call Us"
                            iconColor="bg-[#06113d]/10 dark:bg-[#06113d]/20 text-[#06113d] dark:text-white"
                        />
                        <QuickActionButton
                            href={`https://wa.me/${contactInfo.whatsapp}`}
                            icon={FaWhatsapp}
                            label="WhatsApp"
                            iconColor="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        />
                        <QuickActionButton
                            href={`mailto:${contactInfo.email}`}
                            icon={Mail}
                            label="Email"
                            iconColor="bg-[#e3171e]/10 dark:bg-[#e3171e]/20 text-[#e3171e] dark:text-[#e3171e]"
                        />
                        <QuickActionButton
                            href={contactInfo.address.mapUrl}
                            icon={Navigation}
                            label="Directions"
                            iconColor="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column - Contact Info */}
                        <div className="space-y-6">
                            {/* Address Card */}
                            <ContactCard icon={MapPin} title="Visit Our Clinic" delay={0}>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {contactInfo.address.line1}<br />
                                    {contactInfo.address.line2}<br />
                                    {contactInfo.address.city}
                                </p>
                                <a
                                    href={contactInfo.address.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-3 text-[#e3171e] font-medium hover:gap-3 transition-all"
                                >
                                    Get Directions <ChevronRight className="w-4 h-4" />
                                </a>
                            </ContactCard>

                            {/* Phone Card */}
                            <ContactCard icon={Phone} title="Call Us" delay={0.1}>
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="text-2xl font-bold text-slate-900 dark:text-white hover:text-[#e3171e] transition-colors"
                                >
                                    {contactInfo.phone}
                                </a>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Available during business hours
                                </p>
                            </ContactCard>

                            {/* Hours Card */}
                            <ContactCard icon={Clock} title="Working Hours" delay={0.2}>
                                <div className="space-y-2">
                                    {contactInfo.hours.map((item) => (
                                        <div
                                            key={item.day}
                                            className={`flex justify-between text-sm ${item.day === today
                                                ? 'text-[#e3171e] font-semibold'
                                                : 'text-slate-600 dark:text-slate-400'
                                                }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                {item.day === today && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#e3171e]" />
                                                )}
                                                {item.day}
                                            </span>
                                            <span className={!item.isOpen ? 'text-slate-400' : ''}>
                                                {item.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </ContactCard>

                            {/* Social Media */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    <SocialButton
                                        href={contactInfo.social.instagram}
                                        icon={Instagram}
                                        label="Instagram"
                                        hoverColor="hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white"
                                    />
                                    <SocialButton
                                        href={contactInfo.social.linkedin}
                                        icon={Linkedin}
                                        label="LinkedIn"
                                        hoverColor="hover:bg-[#0077b5] hover:text-white"
                                    />
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                                    Stay updated with health tips, success stories, and clinic updates!
                                </p>
                            </motion.div>
                        </div>

                        {/* Right Column - Map & Form */}
                        <div className="space-y-6">
                            {/* Map */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700"
                            >
                                <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7566001275804!2d78.68984727451698!3d10.75323275962215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa8b2850f31351%3A0xac60c888c73e8f0!2sATREUS%20Physio!5e0!3m2!1sen!2sin!4v1764861031771!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="ATREUS Physio Location"
                                        className="absolute inset-0"
                                    />
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <a
                                        href={contactInfo.address.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/95 backdrop-blur-sm rounded-xl font-semibold text-[#06113d] hover:bg-white transition-colors shadow-lg"
                                    >
                                        <Navigation className="w-5 h-5" />
                                        Open in Google Maps
                                    </a>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e3171e] to-[#c41218] flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Send us a Message</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">We'll get back to you within 24 hours</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            How can we help you?
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-[#06113d] focus:ring-2 focus:ring-[#06113d]/20 outline-none transition-all resize-none"
                                            placeholder="Tell us about your condition or query..."
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={formState === 'loading'}
                                        className="w-full bg-gradient-to-r from-[#06113d] to-[#0a1a5c] hover:from-[#e3171e] hover:to-[#c41218] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                                    >
                                        {formState === 'loading' ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-[#06113d] to-[#0a1a5c] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Start Your Recovery?
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            Book your appointment today and take the first step towards a pain-free life with ATREUS PHYSIO.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href={`https://wa.me/${contactInfo.whatsapp}?text=Hi, I'd like to book an appointment at ATREUS Physio.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                                Book via WhatsApp
                            </motion.a>
                            <motion.a
                                href={`tel:${contactInfo.phone}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/20 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
