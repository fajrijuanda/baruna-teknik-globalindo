"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, CheckCircle2 } from "lucide-react";

export function VisionMissionTab({ content, missionContent }: { content?: { visionId?: string; visionEn?: string }, missionContent?: { missionListId?: string[]; missionListEn?: string[] } }) {
    const { t, language } = useLanguage();
    const isId = language === "id";

    // Vision
    const visionTitle = isId ? "Visi" : "Vision";
    const visionDesc = isId ? content?.visionId : content?.visionEn;

    // Mission
    const missionTitle = isId ? "Misi" : "Mission";
    const missionList = isId ? missionContent?.missionListId : missionContent?.missionListEn;

    return (
        <div className="space-y-12 lg:space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

            {/* Vision Card */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <Card className="relative border border-slate-700 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] overflow-hidden">
                    {/* Watermark Icon */}
                    <Target className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-700/20 rotate-12 pointer-events-none" />

                    <CardContent className="p-8 lg:p-14 text-white relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                                <Target className="w-8 h-8 text-cyan-400" />
                            </div>
                            <h3 className="text-3xl lg:text-5xl font-bold font-oswald tracking-wide">
                                {visionTitle}
                            </h3>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-xl lg:text-2xl font-light">
                            {visionDesc || t.aboutPage.vision.description}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Mission Card */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <Card className="relative border border-slate-700 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] overflow-hidden">
                    {/* Watermark Icon */}
                    <Lightbulb className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-700/20 -rotate-12 pointer-events-none" />

                    <CardContent className="p-8 lg:p-14 text-white relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                <Lightbulb className="w-8 h-8 text-blue-400" />
                            </div>
                            <h3 className="text-3xl lg:text-5xl font-bold font-oswald tracking-wide">
                                {missionTitle}
                            </h3>
                        </div>
                        <ul className="space-y-6">
                            {(missionList || t.aboutPage.mission.list || []).map((item: string, index: number) => (
                                <li key={index} className="flex items-start gap-5">
                                    <CheckCircle2 className="w-7 h-7 text-cyan-400 shrink-0 mt-1" />
                                    <span className="text-slate-300 leading-relaxed text-lg lg:text-xl font-light">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
