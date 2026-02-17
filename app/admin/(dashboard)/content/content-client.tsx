import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeSettingsForm } from "./_components/home-settings-form";
import { AboutSettingsForm } from "./_components/about-settings-form";
import { FeaturesSettingsForm } from "./_components/features-settings-form";
import { AboutPageSettingsForm } from "./_components/about-page-settings-form";
import { ContactSettingsForm } from "./_components/contact-settings-form";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SettingsPageProps {
    homeHeroContent: any;
    homeAboutContent: any;
    homeFeaturesContent: any;

    aboutPageContent: any;
    contactContent: any;
}

export default function ContentTabWrapper({
    homeHeroContent,
    homeAboutContent,
    homeFeaturesContent,

    aboutPageContent,
    contactContent
}: SettingsPageProps) {
    return (
        <Tabs defaultValue="home" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
                <TabsTrigger value="home">Home Page</TabsTrigger>
                <TabsTrigger value="about">About Page</TabsTrigger>
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Home Page Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="hero" className="space-y-6">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                                <TabsTrigger value="about">About Section</TabsTrigger>
                                <TabsTrigger value="features">Features</TabsTrigger>
                            </TabsList>


                            <TabsContent value="hero" className="space-y-4">
                                <HomeSettingsForm initialContent={homeHeroContent} />
                            </TabsContent>

                            <TabsContent value="about" className="space-y-4">
                                <AboutSettingsForm initialContent={homeAboutContent} />
                            </TabsContent>

                            <TabsContent value="features" className="space-y-4">
                                <FeaturesSettingsForm initialContent={homeFeaturesContent} />
                            </TabsContent>


                        </Tabs>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="about">
                <AboutPageSettingsForm initialContent={aboutPageContent} />
            </TabsContent>

            <TabsContent value="contact">
                <ContactSettingsForm initialContent={contactContent} />
            </TabsContent>
        </Tabs>
    );
}
