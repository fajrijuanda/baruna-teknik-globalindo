"use client";

import { useLanguage } from "@/components/providers/language-provider";

export function HistoryTab({ content }: { content?: any }) {
    const { t, language } = useLanguage();
    const isId = language === "id";

    const title = isId ? (content?.titleId || t.aboutPage.history.title) : (content?.titleEn || t.aboutPage.history.title);
    const description = isId ? (content?.descriptionId || t.aboutPage.history.description) : (content?.descriptionEn || t.aboutPage.history.description);

    // Milestones need careful handling as content milestones have En/Id fields but translation fallback does not (it's hardcoded in translation file structure)
    // Translation file structure: milestones: [{ title, description, year }] (implied bilingual by file separation)
    // Content structure: milestones: [{ titleEn, titleId, descriptionEn, descriptionId, year }]

    // We map content milestones to the display format
    const contentMilestones = (content?.milestones || []).map((m: any) => ({
        year: m.year,
        title: isId ? m.titleId : m.titleEn,
        description: isId ? m.descriptionId : m.descriptionEn
    }));

    const displayMilestones = contentMilestones.length > 0 ? contentMilestones : t.aboutPage.history.milestones;

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-oswald mb-4">{title}</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {description}
                </p>
            </div>

            {/* ... rest of layout ... */}
            <div className="relative max-w-4xl mx-auto">
                {/* Center Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:-translate-x-1/2 ml-4 md:ml-0" />

                <div className="space-y-12">
                    {displayMilestones.map((milestone: any, index: number) => (
                        <div key={index} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Content Side */}
                            <div className="flex-1 md:w-1/2 ml-12 md:ml-0 md:px-8">
                                <div className={`p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative
                                    ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}
                                `}>
                                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold rounded-full mb-3">
                                        {milestone.year}
                                    </span>
                                    <h3 className="text-xl font-bold font-oswald mb-2">{milestone.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{milestone.description}</p>

                                    {/* Arrow for Desktop */}
                                    <div className={`hidden md:block absolute top-8 w-4 h-4 bg-white dark:bg-slate-900 border-t border-r border-slate-200 dark:border-slate-800 rotate-45 transform
                                        ${index % 2 === 0 ? '-left-2 border-b-0 border-l-0 -translate-x-1/2' : '-right-2 border-t-0 border-r-0 rotate-[225deg] translate-x-1/2'} 
                                    `} />
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 shadow-sm -translate-x-1/2 top-8 z-10" />

                            {/* Empty Side (Spacer) */}
                            <div className="flex-1 hidden md:block" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
