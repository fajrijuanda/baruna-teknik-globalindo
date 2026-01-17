"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG, PRODUCT_CATEGORIES, NAV_LINKS } from "@/lib/constants";
import { useLanguage } from "@/components/providers/language-provider";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-slate-950 text-slate-200">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Map Section (Left) */}
                    <div className="lg:col-span-4">
                        <div className="rounded-2xl overflow-hidden h-64 w-full shadow-lg border border-slate-800 grayscale hover:grayscale-0 transition-all duration-500 relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6664270097656!2d106.6397223147689!3d-6.175387095529124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8e859e2f54d%3A0x704c71887050540!2sJl.%20Daan%20Mogot%20Km.21%2C%20Tangerang%2C%20Banten!5e0!3m2!1sen!2sid!4v1625567890123!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Links & Products (Middle) */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-oswald text-lg font-bold text-white mb-6 uppercase tracking-wider">{t.footer.quickLinks}</h3>
                            <ul className="space-y-4">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <span className="h-1 w-1 bg-blue-500 rounded-full"></span>
                                            {/* We can map this or just rely on Nav using the same keys if possible, but here we probably need to translate again or use the same labels. 
                                                Since we don't have getTranslatedLabel available here easily without duplicating logic, 
                                                simple way is to just use the dictionary if keys match or just duplicate the switch
                                                or export the helper. 
                                                For now I'll just map manually or assume labels match keys in t.nav if simplified.
                                                Actually, let's just map based on label.
                                            */}
                                            {link.label === "Home" ? t.nav.home :
                                                link.label === "About Us" ? t.nav.about :
                                                    link.label === "Products" ? t.nav.products :
                                                        link.label === "Contact" ? t.nav.contact : link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-oswald text-lg font-bold text-white mb-6 uppercase tracking-wider">{t.footer.productCategory}</h3>
                            <ul className="space-y-4">
                                {PRODUCT_CATEGORIES.map((category) => (
                                    <li key={category.id}>
                                        <Link
                                            href={`/products?category=${category.slug}`}
                                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            <span className="h-1 w-1 bg-blue-500 rounded-full"></span>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Brand & Contact (Right) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl font-oswald shadow-blue-900/20 shadow-lg">
                                B
                            </div>
                            <span className="text-2xl font-bold font-oswald tracking-tight text-white">
                                BARUNA TEKNIK
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-1" />
                                <span className="text-slate-400 text-sm leading-relaxed">{SITE_CONFIG.address}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                                <span className="text-slate-400 text-sm">{SITE_CONFIG.phone}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                                <span className="text-slate-400 text-sm">{SITE_CONFIG.email}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link href="#" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white text-slate-400 transition-all duration-300">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white text-slate-400 transition-all duration-300">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white text-slate-400 transition-all duration-300">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} PT Baruna Teknik Globalindo. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
