"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

export function VisionMissionTab() {
    const { t } = useLanguage();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Vision */}
            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900 group">
                <CardContent className="p-8 lg:p-10">
                    <div className="mb-6 h-16 w-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                        <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold font-oswald text-slate-900 dark:text-white mb-4">
                        {t.aboutPage.vision.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                        {t.aboutPage.vision.description}
                    </p>
                </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900 group">
                <CardContent className="p-8 lg:p-10">
                    <div className="mb-6 h-16 w-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                        <Lightbulb className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold font-oswald text-slate-900 dark:text-white mb-4">
                        {t.aboutPage.mission.title}
                    </h3>
                    <ul className="space-y-4">
                        {t.aboutPage.mission.list.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="h-2 w-2 mt-2.5 rounded-full bg-indigo-600 shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
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
