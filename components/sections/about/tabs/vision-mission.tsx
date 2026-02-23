"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent } from "@/components/ui/card";

export function VisionMissionTab({ content, missionContent }: { content?: Record<string, any>, missionContent?: Record<string, any> }) {
    const { t, language } = useLanguage();
    const isId = language === "id";

    // Vision
    const visionTitle = isId ? "Visi" : "Vision";
    const visionDesc = isId ? content?.visionId : content?.visionEn;

    // Mission
    const missionTitle = isId ? "Misi" : "Mission";
    const missionList = isId ? missionContent?.missionListId : missionContent?.missionListEn;

    return (
        <div className="space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Vision Card */}
            <Card className="border-none shadow-md bg-slate-600 dark:bg-slate-800 rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-8 lg:p-12 text-white">
                    <h3 className="text-3xl lg:text-4xl font-bold font-oswald mb-6">
                        {visionTitle}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-lg lg:text-xl font-medium">
                        {visionDesc || t.aboutPage.vision.description}
                    </p>
                </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="border-none shadow-md bg-slate-600 dark:bg-slate-800 rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-8 lg:p-12 text-white">
                    <h3 className="text-3xl lg:text-4xl font-bold font-oswald mb-6">
                        {missionTitle}
                    </h3>
                    <ul className="space-y-4">
                        {(missionList || t.aboutPage.mission.list || []).map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-4">
                                <span className="h-2 w-2 mt-2.5 rounded-full bg-white shrink-0" />
                                <span className="text-white/90 leading-relaxed text-lg lg:text-xl font-medium">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
