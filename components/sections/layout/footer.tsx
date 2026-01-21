"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG, PRODUCT_CATEGORIES, NAV_LINKS } from "@/lib/constants";
import { useLanguage } from "@/components/providers/language-provider";
import type { ContactContent } from "@/lib/types";

export function Footer({ contactContent }: { contactContent?: ContactContent }) {
    const { t } = useLanguage();

    // Fallback values
    const address = contactContent?.address || SITE_CONFIG.address;
    const phone = contactContent?.phone || SITE_CONFIG.phone;
    const email = contactContent?.email || SITE_CONFIG.email;
    const googleMapsUrl = contactContent?.googleMapsUrl || "https://maps.google.com/maps?q=Jl.+Letjen+M.T.+Haryono+No.Kav.10,+Jakarta&z=15&output=embed";

    return (
        <footer className="bg-slate-950 text-slate-200">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Map Section (Left) */}
                    <div className="lg:col-span-4">
                        <div className="rounded-2xl overflow-hidden h-64 w-full shadow-lg border border-slate-800 grayscale hover:grayscale-0 transition-all duration-500 relative">
                            <iframe
                                title="Google Maps Location of Baruna Teknik"
                                src={googleMapsUrl}
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
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/images/logo.png"
                                    alt="Baruna Teknik"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-2xl font-bold font-oswald tracking-tight text-white">
                                BARUNA TEKNIK
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-1" />
                                <span className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{address}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                                <span className="text-slate-400 text-sm">{phone}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                                <span className="text-slate-400 text-sm">{email}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {contactContent?.facebook && (
                                <Link href={contactContent.facebook} target="_blank" aria-label="Visit our Facebook page" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white text-slate-400 transition-all duration-300">
                                    <Facebook className="h-5 w-5" />
                                </Link>
                            )}
                            {contactContent?.instagram && (
                                <Link href={contactContent.instagram} target="_blank" aria-label="Visit our Instagram page" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-pink-600 hover:border-pink-600 hover:text-white text-slate-400 transition-all duration-300">
                                    <Instagram className="h-5 w-5" />
                                </Link>
                            )}
                            {contactContent?.linkedin && (
                                <Link href={contactContent.linkedin} target="_blank" aria-label="Visit our LinkedIn page" className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white text-slate-400 transition-all duration-300">
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                            )}
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
