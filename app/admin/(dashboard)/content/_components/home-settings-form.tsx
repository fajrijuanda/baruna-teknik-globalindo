"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ui/image-upload";
import { updatePageContent } from "@/lib/actions/content";
import { useRouter } from "next/navigation";

// Define strict types for our content to avoid 'any'
interface HomeHeroContent {
    titleEn: string;
    titleId: string;
    subtitleEn: string;
    subtitleId: string;
    heroImage: string;
}

interface SettingsFormProps {
    initialContent: HomeHeroContent | null;
}

export const HomeSettingsForm: React.FC<SettingsFormProps> = ({ initialContent }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<HomeHeroContent>(initialContent || {
        titleEn: "",
        titleId: "",
        subtitleEn: "",
        subtitleId: "",
        heroImage: ""
    });

    const handleChange = (key: keyof HomeHeroContent, value: string) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            await updatePageContent("home", "hero", data);
            alert("Home settings updated!"); // Placeholder for toast
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Home Hero Section</h3>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Hero Image</Label>
                    <ImageUpload
                        value={data.heroImage ? [data.heroImage] : []}
                        onChange={(url) => handleChange("heroImage", url)}
                        onRemove={() => handleChange("heroImage", "")}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Title (English)</Label>
                        <Input
                            value={data.titleEn}
                            onChange={(e) => handleChange("titleEn", e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Title (Indonesian)</Label>
                        <Input
                            value={data.titleId}
                            onChange={(e) => handleChange("titleId", e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle (English)</Label>
                        <Textarea
                            value={data.subtitleEn}
                            onChange={(e) => handleChange("subtitleEn", e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle (Indonesian)</Label>
                        <Textarea
                            value={data.subtitleId}
                            onChange={(e) => handleChange("subtitleId", e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>
                <Button onClick={onSubmit} disabled={loading} className="bg-blue-900">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};
