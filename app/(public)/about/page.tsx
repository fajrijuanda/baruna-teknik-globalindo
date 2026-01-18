import { PageHeader } from "@/components/shared/page-header";
import { AboutContent } from "@/components/sections/about/about-content";
import { AboutTabsLayout } from "@/components/sections/about/about-tabs-layout";
import { getPageContent } from "@/lib/actions/content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = await getPageContent("about", "details") as any;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Note: PageHeader currently uses client-side translations. 
                For now, we keep it as is, or we could pass content if we wanted. 
                The user's request focused on content settings for sections.*/}
            <PageHeader
                title="ABOUT US"
                subtitle="Building the industrial future with trusted and innovative engineering solutions."
            />

            {/* Futuristic About Content (Hero-like) */}
            <AboutContent />

            {/* Vertical Tabs Section (Vision, CEO, Org, History) */}
            <AboutTabsLayout content={content} />
        </main>
    );
}
