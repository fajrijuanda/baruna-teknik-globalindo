"use client";

import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function ContactContent({ contactContent }: { contactContent: any }) {
    const { t } = useLanguage();

    // Fallback to SITE_CONFIG if no DB content, though specific fields like hours might not exist there
    const address = contactContent?.address || SITE_CONFIG.address;
    const phone = contactContent?.phone || SITE_CONFIG.phone;
    const email = contactContent?.email || SITE_CONFIG.email;
    const hours = contactContent?.hours || "Senin - Jumat: 08:00 - 17:00";
    const hoursDesc = contactContent?.hoursDesc || "";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <PageHeader
                title={t.contactPage.header.title}
                subtitle={t.contactPage.header.subtitle}
                className="mb-12"
            />

            <div className="container mx-auto px-4 md:px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800">
                            <h3 className="font-bold text-2xl mb-8 uppercase tracking-wide border-b border-slate-700 pb-4">
                                {t.contactPage.info.title}
                            </h3>
                            <ul className="space-y-8">
                                <li className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-600/20">
                                        <MapPin className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-400 uppercase mb-2 tracking-wider">
                                            {t.contactPage.info.address}
                                        </h4>
                                        <p className="leading-relaxed text-slate-100 font-medium whitespace-pre-line">{address}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-600/20">
                                        <Phone className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-400 uppercase mb-2 tracking-wider">
                                            {t.contactPage.info.phone}
                                        </h4>
                                        <p className="leading-relaxed text-slate-100 font-medium">{phone}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-600/20">
                                        <Mail className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-400 uppercase mb-2 tracking-wider">
                                            {t.contactPage.info.email}
                                        </h4>
                                        <p className="leading-relaxed text-slate-100 font-medium">{email}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-600/20">
                                        <Clock className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-400 uppercase mb-2 tracking-wider">
                                            {t.contactPage.info.hours}
                                        </h4>
                                        <p className="leading-relaxed text-slate-100 font-medium font-oswald text-lg">
                                            {hours}
                                        </p>
                                        {hoursDesc && (
                                            <p className="text-slate-400 text-sm mt-1 whitespace-pre-line">{hoursDesc}</p>
                                        )}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-8 uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-4">
                            {t.contactPage.form.title}
                        </h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        {t.contactPage.form.name}
                                    </label>
                                    <Input
                                        placeholder={t.contactPage.form.namePlaceholder}
                                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        {t.contactPage.form.company}
                                    </label>
                                    <Input
                                        placeholder={t.contactPage.form.companyPlaceholder}
                                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {t.contactPage.form.email}
                                </label>
                                <Input
                                    type="email"
                                    placeholder={t.contactPage.form.emailPlaceholder}
                                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    {t.contactPage.form.message}
                                </label>
                                <textarea
                                    className="w-full min-h-[150px] p-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm placeholder:text-slate-400"
                                    placeholder={t.contactPage.form.messagePlaceholder}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 uppercase tracking-wide">
                                {t.contactPage.form.submit}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
