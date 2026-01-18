"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";
import { Target, User, Users, History, ChevronRight } from "lucide-react";

// Import Content Components
import { VisionMissionTab } from "./tabs/vision-mission";
import { CEOMessageTab } from "./tabs/ceo-message";
import { OrganizationTab } from "./tabs/organization";
import { HistoryTab } from "./tabs/history";


// ... imports


type TabValue = "vision" | "ceo" | "organization" | "history";

interface AboutTabsLayoutProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content?: any;
}

export function AboutTabsLayout({ content }: AboutTabsLayoutProps) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabValue>("vision");

    // Tab Configuration
    const tabs = [
        { id: "vision", label: t.aboutPage.tabs.visionMission, icon: Target },
        { id: "ceo", label: t.aboutPage.tabs.ceoMessage, icon: User },
        { id: "organization", label: t.aboutPage.tabs.organization, icon: Users },
        { id: "history", label: t.aboutPage.tabs.history, icon: History },
    ];

    // Helper to render active content
    const renderContent = () => {
        switch (activeTab) {
            case "vision": return <VisionMissionTab content={content?.vision} missionContent={content?.mission} />;
            case "ceo": return <CEOMessageTab content={content?.ceo} />;
            case "organization": return <OrganizationTab content={content?.organization} />;
            case "history": return <HistoryTab content={content?.history} />;
            default: return <VisionMissionTab content={content?.vision} missionContent={content?.mission} />;
        }
    };


    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 min-h-[800px]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Sidebar Navigation (Vertical Tabs on Desktop, Horizontal Scroll on Mobile) */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="sticky top-24 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-2 lg:flex lg:flex-col gap-2">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as TabValue)}
                                        className={cn(
                                            "flex-shrink-0 flex items-center justify-between p-3 lg:p-4 rounded-xl transition-all duration-300 group text-left w-full",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 lg:gap-3">
                                            <Icon className={cn("h-4 w-4 lg:h-5 lg:w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500")} />
                                            <span className="font-bold font-oswald tracking-wide whitespace-nowrap text-xs lg:text-base">{tab.label}</span>
                                        </div>
                                        {isActive && <ChevronRight className="hidden lg:block h-4 w-4 animate-in slide-in-from-left-2" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-h-[600px]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </section>
    );
}
