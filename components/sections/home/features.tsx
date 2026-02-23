"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, ShoppingBag } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { useLanguage } from "@/components/providers/language-provider";
import { PAGE_CONTENT } from "@/lib/data/static";

export function Features() {
    const { language, t } = useLanguage();
    const isId = language === "id";

    const title = isId ? PAGE_CONTENT.home.features.titleId : PAGE_CONTENT.home.features.titleEn;
    const services = PAGE_CONTENT.home.features.services;

    // Use specific icons for the two services
    const getIcon = (index: number) => {
        if (index === 0) return <Settings className="h-10 w-10 text-blue-600" />;
        return <ShoppingBag className="h-10 w-10 text-blue-600" />;
    };

    return (
        <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={title}
                    subtitle={isId ? t.features.subtitle : t.features.subtitle} // Keep old subtitle logic if it exists in translation, else we can pass empty string if not needed
                    className="text-white mb-16"
                    titleClassName="text-white"
                    subtitleClassName="text-slate-400"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-slate-900 overflow-hidden flex flex-col h-full">
                            <CardHeader className="p-8 pb-4 relative z-10">
                                <div className="mb-6 p-4 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300">
                                    {getIcon(index)}
                                </div>
                                <CardTitle className="text-2xl font-oswald text-white leading-tight">
                                    {isId ? service.titleId : service.titleEn}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 relative z-10 flex-grow">
                                <div className="text-lg text-slate-400 leading-relaxed text-justify">
                                    {isId ? service.descriptionId : service.descriptionEn}
                                </div>
                            </CardContent>

                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-all duration-500 group-hover:bg-blue-500/10" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
