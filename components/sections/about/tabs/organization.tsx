"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { User } from "lucide-react";

// Mock Data for Org Structure
// ... imports
import Image from "next/image";

// Mock Data for Org Structure (Fallback)
const departments = [
    // ... same mock data
    {
        name: "Executive Leadership",
        members: [
            { name: "Director Name", role: "President Director", color: "bg-blue-500" },
        ]
    },
    {
        name: "Management Team",
        members: [
            { name: "Manager One", role: "Operations Manager", color: "bg-indigo-500" },
            { name: "Manager Two", role: "Finance Manager", color: "bg-indigo-500" },
            { name: "Manager Three", role: "Sales Manager", color: "bg-indigo-500" },
        ]
    },
    {
        name: "Technical & Sales",
        members: [
            { name: "Team Lead", role: "Technical Lead", color: "bg-cyan-500" },
            { name: "Staff A", role: "Senior Engineer", color: "bg-slate-400" },
            { name: "Staff B", role: "Sales Executive", color: "bg-slate-400" },
        ]
    }
];

export function OrganizationTab({ content }: { content?: any }) {
    const { t, language } = useLanguage();
    const isId = language === "id";

    const title = isId ? (content?.titleId || t.aboutPage.organization.title) : (content?.titleEn || t.aboutPage.organization.title);
    const description = isId ? (content?.descriptionId || t.aboutPage.organization.description) : (content?.descriptionEn || t.aboutPage.organization.description);
    const image = content?.image;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-oswald mb-4">{title}</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {description}
                </p>
            </div>

            {image ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
                    <Image src={image} alt="Organization Chart" fill className="object-contain bg-white" />
                </div>
            ) : (
                <div className="relative">
                    {/* Connecting Lines (Simplified) */}
                    <div className="absolute left-1/2 top-10 bottom-10 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12 relative z-10">
                        {departments.map((dept, deptIdx) => (
                            <div key={deptIdx} className="flex flex-col items-center">
                                {/* Dept Label */}
                                <div className="mb-6 px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-widest text-slate-500">
                                    {dept.name}
                                </div>

                                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                                    {dept.members.map((member, memIdx) => (
                                        <div key={memIdx} className="flex flex-col items-center group">
                                            <div className={`h-24 w-24 rounded-full ${member.color} p-1 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <div className="h-full w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                                                    <User className="h-10 w-10 text-slate-400" />
                                                </div>
                                            </div>
                                            <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm min-w-[200px]">
                                                <h4 className="font-bold font-oswald text-lg">{member.name}</h4>
                                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{member.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
