"use client";

import { PageHeader } from "@/components/shared/page-header";
import { AboutContent } from "@/components/sections/about/about-content";
import { useLanguage } from "@/components/providers/language-provider";
import { AboutTabsLayout } from "@/components/sections/about/about-tabs-layout";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <PageHeader
                title={t.aboutPage.header.title}
                subtitle={t.aboutPage.header.subtitle}
            />

            {/* Futuristic About Content (Hero-like) */}
            <AboutContent />

            {/* Vertical Tabs Section (Vision, CEO, Org, History) */}
            <AboutTabsLayout />
        </main>
    );
}
