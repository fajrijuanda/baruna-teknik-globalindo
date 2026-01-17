"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export function About() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <div className="relative group min-h-[400px]">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                            <Image
                                src="/images/about-image.png"
                                alt="Industrial Facility"
                                fill
                                className="object-cover transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden md:block animate-bounce-slow">
                            <p className="text-4xl font-bold font-oswald mb-1">15+</p>
                            <p className="text-sm font-medium opacity-90">{t.about.stat1}</p>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="space-y-8">
                        <div>
                            <div className="h-1 w-20 bg-blue-600 rounded-full mb-6" />
                            <h2 className="text-4xl md:text-5xl font-bold font-oswald text-slate-900 dark:text-white leading-tight">
                                {t.about.title}
                            </h2>
                        </div>

                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            {t.about.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                t.about.stat3,
                                t.about.stat2,
                                "After Sales Service",
                                "Nationwide Delivery"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                                    <span className="font-medium text-slate-700 dark:text-slate-200">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800" asChild>
                                <Link href="/about">
                                    {t.about.cta}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
