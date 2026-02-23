"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { PAGE_CONTENT } from "@/lib/data/static";

export function AboutContent() {
    const { language, t } = useLanguage();
    const isId = language === "id";

    const title = isId ? PAGE_CONTENT.home.about.titleId : PAGE_CONTENT.home.about.titleEn;
    const contentText = isId ? PAGE_CONTENT.home.about.contentId : PAGE_CONTENT.home.about.contentEn;

    // Split the text by double newlines into paragraphs
    const paragraphs = contentText.split('\n\n');

    return (
        <section className="py-12 lg:py-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* Left Column: Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
                        <Image
                            src="/images/about-image.png"
                            alt="Industrial Facility"
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Right Column: Clean Text Content */}
                    <div className="space-y-6 pt-2 lg:pl-8">
                        <h2 className="text-3xl lg:text-5xl font-bold font-oswald text-slate-900 dark:text-white mb-6">
                            {title}
                        </h2>

                        <div className="space-y-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                            {paragraphs.map((p: string, idx: number) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
