"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { PAGE_CONTENT } from "@/lib/data/static";

export function AboutContent() {
    const { language } = useLanguage();
    const isId = language === "id";

    const title = isId ? PAGE_CONTENT.home.about.titleId : PAGE_CONTENT.home.about.titleEn;
    const contentText = isId ? PAGE_CONTENT.home.about.contentId : PAGE_CONTENT.home.about.contentEn;

    // Split the text by double newlines into paragraphs
    const paragraphs = contentText.split('\n\n');

    return (
        <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">

                    {/* Left Column: Image with Industrial Frame */}
                    <div className="relative group perspective-1000">
                        {/* Glow / Shadow behind the image */}
                        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl sm:rounded-[2rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-700" />

                        {/* The Image Container */}
                        <div className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden border border-white/20 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 transform transition-transform duration-700 group-hover:scale-[1.02]">
                            <Image
                                src="/images/about-image.png"
                                alt="Industrial Facility"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                            />

                            {/* Decorative Overlay Badge */}
                            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-3 rounded-xl border border-white/20 dark:border-slate-700 shadow-lg">
                                <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 font-oswald tracking-widest uppercase">
                                    Established 2010
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Text Content */}
                    <div className="space-y-8 pt-4 lg:pt-0">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
                                <span className="text-sm font-bold text-blue-600 dark:text-cyan-500 tracking-[0.2em] uppercase">
                                    {isId ? "Profil Perusahaan" : "Company Profile"}
                                </span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold font-oswald text-slate-900 dark:text-white leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                                    {title}
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                            {paragraphs.map((p: string, idx: number) => (
                                <p key={idx} className="relative z-10">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
