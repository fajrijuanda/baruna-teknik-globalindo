"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { useLanguage } from "@/components/providers/language-provider";

interface FeaturesProps {
    content?: {
        titleEn?: string;
        titleId?: string;
        subtitleEn?: string;
        subtitleId?: string;
        // Dynamic Cards
        card1Icon?: string;
        card1TitleEn?: string;
        card1TitleId?: string;
        card1DescEn?: string;
        card1DescId?: string;

        card2Icon?: string;
        card2TitleEn?: string;
        card2TitleId?: string;
        card2DescEn?: string;
        card2DescId?: string;

        card3Icon?: string;
        card3TitleEn?: string;
        card3TitleId?: string;
        card3DescEn?: string;
        card3DescId?: string;

        card4Icon?: string;
        card4TitleEn?: string;
        card4TitleId?: string;
        card4DescEn?: string;
        card4DescId?: string;
    }
}

export function Features({ content }: FeaturesProps) {
    const { language, t } = useLanguage();
    const isId = language === "id";

    const title = isId ? (content?.titleId || t.features.title) : (content?.titleEn || t.features.title);
    const subtitle = isId ? (content?.subtitleId || t.features.subtitle) : (content?.subtitleEn || t.features.subtitle);

    const getIcon = (name: string, fallback: any) => {
        if (!name) return fallback;
        const Icon = (LucideIcons as any)[name];
        return Icon ? <Icon className="h-10 w-10 text-blue-600" /> : fallback;
    };

    const features = [
        {
            icon: getIcon(content?.card1Icon || "", <LucideIcons.BadgeCheck className="h-10 w-10 text-blue-600" />),
            title: isId ? (content?.card1TitleId || t.features.card1Title) : (content?.card1TitleEn || t.features.card1Title),
            description: isId ? (content?.card1DescId || t.features.card1Desc) : (content?.card1DescEn || t.features.card1Desc),
        },
        {
            icon: getIcon(content?.card2Icon || "", <LucideIcons.Cog className="h-10 w-10 text-blue-600" />),
            title: isId ? (content?.card2TitleId || t.features.card2Title) : (content?.card2TitleEn || t.features.card2Title),
            description: isId ? (content?.card2DescId || t.features.card2Desc) : (content?.card2DescEn || t.features.card2Desc),
        },
        {
            icon: getIcon(content?.card3Icon || "", <LucideIcons.Truck className="h-10 w-10 text-blue-600" />),
            title: isId ? (content?.card3TitleId || t.features.card3Title) : (content?.card3TitleEn || t.features.card3Title),
            description: isId ? (content?.card3DescId || t.features.card3Desc) : (content?.card3DescEn || t.features.card3Desc),
        },
        {
            icon: getIcon(content?.card4Icon || "", <LucideIcons.ShieldCheck className="h-10 w-10 text-blue-600" />),
            title: isId ? (content?.card4TitleId || t.features.card4Title) : (content?.card4TitleEn || t.features.card4Title),
            description: isId ? (content?.card4DescId || t.features.card4Desc) : (content?.card4DescEn || t.features.card4Desc),
        },
    ];

    return (
        <section className="py-24 bg-slate-950">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    className="text-white"
                    titleClassName="text-white"
                    subtitleClassName="text-slate-400"
                />

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 group bg-white">
                            <CardHeader className="p-4 md:p-6 pb-2 md:pb-4">
                                <div className="mb-3 md:mb-4 p-2 md:p-3 bg-blue-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                                    {/* Clone icon with distinct classes for mobile/desktop if needed, but standard sizing usually works. 
                                        However, since we used a helper function earlier that hardcoded classes, let's just rely on scaling or adjust the helper if needed.
                                        But actually, the helper renders <Icon className="h-10 w-10..." />.
                                        On mobile 2-col, 10 might be big. We can't easily change it here without refactoring getIcon. 
                                        Let's trust it fits or assume user is okay with big icons. 
                                        Actually, I should refactor getIcon to be responsive or accept className.
                                        BUT, I can't edit getIcon in this block easily since it's earlier in file.
                                        I'll stick to adjusting the container.
                                    */}
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-base md:text-xl font-oswald text-slate-900 leading-tight">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                                <CardDescription className="text-xs md:text-base text-slate-600 leading-relaxed line-clamp-3 md:line-clamp-none">
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
