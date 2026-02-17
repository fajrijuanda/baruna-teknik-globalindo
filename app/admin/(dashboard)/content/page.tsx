import { getPageContent } from "@/lib/actions/content";
import ContentTabWrapper from "./content-client";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
    const homeHero = await getPageContent("home", "hero");
    const homeAbout = await getPageContent("home", "about");
    const homeFeatures = await getPageContent("home", "features");


    // Future placeholders
    const aboutPage = await getPageContent("about", "details");
    const contactPage = await getPageContent("contact", "info");

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-slate-800">Site Content</h2>
            </div>
            <ContentTabWrapper
                homeHeroContent={homeHero}
                homeAboutContent={homeAbout}
                homeFeaturesContent={homeFeatures}

                aboutPageContent={aboutPage}
                contactContent={contactPage}
            />
        </div>
    );
}
