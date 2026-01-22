"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ui/image-upload";
import { updatePageContent } from "@/lib/actions/content";
import { useRouter } from "next/navigation";

interface AboutContent {
    image: string;
    titleEn: string;
    titleId: string;
    descriptionEn: string;
    descriptionId: string;
    stat1LabelEn: string;
    stat1LabelId: string;
    stat2LabelEn: string;
    stat2LabelId: string;
    stat3LabelEn: string;
    stat3LabelId: string;
    stat4LabelEn: string;
    stat4LabelId: string;
    stat5LabelEn: string;
    stat5LabelId: string;
    ctaTextEn: string;
    ctaTextId: string;
}

interface SettingsFormProps {
    initialContent: AboutContent | null;
}

export const AboutSettingsForm: React.FC<SettingsFormProps> = ({ initialContent }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AboutContent>(initialContent || {
        image: "",
        titleEn: "",
        titleId: "",
        descriptionEn: "",
        descriptionId: "",
        stat1LabelEn: "",
        stat1LabelId: "",
        stat2LabelEn: "",
        stat2LabelId: "",
        stat3LabelEn: "",
        stat3LabelId: "",
        stat4LabelEn: "",
        stat4LabelId: "",
        stat5LabelEn: "",
        stat5LabelId: "",
        ctaTextEn: "",
        ctaTextId: ""
    });

    const handleChange = (key: keyof AboutContent, value: string) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            await updatePageContent("home", "about", data as any);
            alert("About settings updated!");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">About Section Settings</h3>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>About Image</Label>
                    <ImageUpload
                        value={data.image ? [data.image] : []}
                        onChange={(url) => handleChange("image", url)}
                        onRemove={() => handleChange("image", "")}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Title (English)</Label>
                        <Input value={data.titleEn} onChange={(e) => handleChange("titleEn", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Title (Indonesian)</Label>
                        <Input value={data.titleId} onChange={(e) => handleChange("titleId", e.target.value)} disabled={loading} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Description (English)</Label>
                        <Textarea className="min-h-[100px]" value={data.descriptionEn} onChange={(e) => handleChange("descriptionEn", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description (Indonesian)</Label>
                        <Textarea className="min-h-[100px]" value={data.descriptionId} onChange={(e) => handleChange("descriptionId", e.target.value)} disabled={loading} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>CTA Text (English)</Label>
                        <Input value={data.ctaTextEn} onChange={(e) => handleChange("ctaTextEn", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>CTA Text (Indonesian)</Label>
                        <Input value={data.ctaTextId} onChange={(e) => handleChange("ctaTextId", e.target.value)} disabled={loading} />
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-2">
                        <Label>Stat 1 Label (EN)</Label>
                        <Input value={data.stat1LabelEn} onChange={(e) => handleChange("stat1LabelEn", e.target.value)} disabled={loading} placeholder="Years Exp" />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 2 Label (EN)</Label>
                        <Input value={data.stat2LabelEn} onChange={(e) => handleChange("stat2LabelEn", e.target.value)} disabled={loading} placeholder="Happy Clients" />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 3 Label (EN)</Label>
                        <Input value={data.stat3LabelEn} onChange={(e) => handleChange("stat3LabelEn", e.target.value)} disabled={loading} placeholder="Partner Brands" />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 4 Label (EN)</Label>
                        <Input value={data.stat4LabelEn} onChange={(e) => handleChange("stat4LabelEn", e.target.value)} disabled={loading} placeholder="After Sales" />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 5 Label (EN)</Label>
                        <Input value={data.stat5LabelEn} onChange={(e) => handleChange("stat5LabelEn", e.target.value)} disabled={loading} placeholder="Nationwide Delivery" />
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-2">
                        <Label>Stat 1 Label (ID)</Label>
                        <Input value={data.stat1LabelId} onChange={(e) => handleChange("stat1LabelId", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 2 Label (ID)</Label>
                        <Input value={data.stat2LabelId} onChange={(e) => handleChange("stat2LabelId", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 3 Label (ID)</Label>
                        <Input value={data.stat3LabelId} onChange={(e) => handleChange("stat3LabelId", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 4 Label (ID)</Label>
                        <Input value={data.stat4LabelId} onChange={(e) => handleChange("stat4LabelId", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Stat 5 Label (ID)</Label>
                        <Input value={data.stat5LabelId} onChange={(e) => handleChange("stat5LabelId", e.target.value)} disabled={loading} />
                    </div>
                </div>

                <Button onClick={onSubmit} disabled={loading} className="bg-blue-900 w-full">
                    Save About Settings
                </Button>
            </div>
        </div>
    );
};
