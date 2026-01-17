"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { Quote } from "lucide-react";

export function CEOMessageTab() {
    const { t } = useLanguage();

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative h-96 lg:h-auto min-h-[400px]">
                        <Image
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                            alt="CEO Portrait"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:bg-gradient-to-r" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h3 className="text-3xl font-bold font-oswald mb-2">{t.aboutPage.ceoMessage.name}</h3>
                            <p className="text-blue-400 font-medium">{t.aboutPage.ceoMessage.role}</p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <Quote className="h-12 w-12 text-blue-500/20 mb-6" />
                        <h2 className="text-3xl font-bold font-oswald mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            {t.aboutPage.ceoMessage.title}
                        </h2>
                        <h4 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-8 italic">
                            &quot;{t.aboutPage.ceoMessage.subtitle}&quot;
                        </h4>

                        <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                            {t.aboutPage.ceoMessage.content.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png"
                                alt="Signature"
                                width={150}
                                height={60}
                                className="opacity-50 dark:invert"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
