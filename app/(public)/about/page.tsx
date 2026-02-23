import { PageHeader } from "@/components/shared/page-header";
import { AboutContent } from "@/components/sections/about/about-content";
import { VisionMissionTab } from "@/components/sections/about/tabs/vision-mission";
import { PAGE_CONTENT } from "@/lib/data/static";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
    const content = PAGE_CONTENT.about.details;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <PageHeader
                title="ABOUT US"
                subtitle="Building the industrial future with trusted and innovative engineering solutions."
            />

            {/* Main About Details */}
            <AboutContent />

            {/* Vision and Mission Section */}
            <section className="py-12 lg:py-20 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4 max-w-5xl">
                    <VisionMissionTab content={content} missionContent={content} />
                </div>
            </section>
        </main>
    );
}
