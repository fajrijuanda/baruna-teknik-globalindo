"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Cog, Truck, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { useLanguage } from "@/components/providers/language-provider";

export function Features() {
    const { t } = useLanguage();

    const features = [
        {
            icon: <BadgeCheck className="h-10 w-10 text-blue-600" />,
            title: t.features.card1Title,
            description: t.features.card1Desc,
        },
        {
            icon: <Cog className="h-10 w-10 text-blue-600" />,
            title: t.features.card2Title,
            description: t.features.card2Desc,
        },
        {
            icon: <Truck className="h-10 w-10 text-blue-600" />,
            title: t.features.card3Title,
            description: t.features.card3Desc,
        },
        {
            icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
            title: t.features.card4Title,
            description: t.features.card4Desc,
        },
    ];

    return (
        <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={t.features.title}
                    subtitle={t.features.subtitle}
                    className="text-white"
                    titleClassName="text-white"
                    subtitleClassName="text-slate-400"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-white">
                            <CardHeader>
                                <div className="mb-4 p-3 bg-blue-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl font-oswald text-slate-900">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base text-slate-600 leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
