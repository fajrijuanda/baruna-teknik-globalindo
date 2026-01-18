"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { CheckCircle2, Factory, Globe2, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AboutContent() {
    const { t } = useLanguage();

    // Additional grid stats for the "futuristic" feel
    const gridStats = [
        { icon: <Factory className="w-6 h-6 text-blue-400" />, label: "Modern Facility", value: "2000m²" },
        { icon: <Users className="w-6 h-6 text-indigo-400" />, label: "Expert Team", value: "50+" },
        { icon: <Globe2 className="w-6 h-6 text-cyan-400" />, label: "Global Partners", value: "25+" },
        { icon: <Award className="w-6 h-6 text-emerald-400" />, label: "Certified", value: "ISO 9001" },
    ];

    return (
        <section className="py-12 lg:py-24 bg-slate-950 text-white overflow-hidden relative">
            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Column: Image with "Futuristic" Frame */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-2xl opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500" />
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                            <Image
                                src="/images/about-image.png"
                                alt="Industrial Facility"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay UI Elements */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="font-mono text-sm text-green-400">OPERATIONAL SYSTEM: ONLINE</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Stats Grid */}
                        <div className="hidden lg:grid grid-cols-2 gap-2 absolute -right-12 -bottom-12 w-64">
                            {gridStats.map((stat, idx) => (
                                <div key={idx} className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl hover:border-blue-500/50 transition-colors">
                                    <div className="mb-2">{stat.icon}</div>
                                    <div className="text-xl font-bold font-oswald">{stat.value}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Content with Grid Layout */}
                    <div className="space-y-8 lg:pl-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px w-8 bg-blue-500" />
                                <span className="text-blue-400 uppercase tracking-widest text-sm font-medium">Established 2010</span>
                            </div>
                            <h2 className="text-2xl lg:text-5xl font-bold font-oswald leading-tight mb-4 lg:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                {t.about.title}
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-6">
                                {t.about.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                            {[
                                t.about.stat3,
                                t.about.stat2,
                                "After Sales Service",
                                "Nationwide Delivery"
                            ].map((item, index) => (
                                <Card key={index} className="bg-slate-900 border-slate-800 hover:border-blue-500/50 transition-colors group">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                            <CheckCircle2 className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                                        </div>
                                        <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{item}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
