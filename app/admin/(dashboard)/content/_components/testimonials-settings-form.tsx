"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updatePageContent } from "@/lib/actions/content";
import { useRouter } from "next/navigation";

interface TestimonialsContent {
    titleEn: string;
    titleId: string;
    subtitleEn: string;
    subtitleId: string;
}

interface SettingsFormProps {
    initialContent: TestimonialsContent | null;
}

export const TestimonialsSettingsForm: React.FC<SettingsFormProps> = ({ initialContent }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TestimonialsContent>(initialContent || {
        titleEn: "",
        titleId: "",
        subtitleEn: "",
        subtitleId: ""
    });

    const handleChange = (key: keyof TestimonialsContent, value: string) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            await updatePageContent("home", "testimonials", data);
            alert("Testimonials settings updated!");
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
            <h3 className="text-lg font-semibold">Testimonials Section Settings</h3>
            <div className="space-y-6">
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
                        <Label>Subtitle (English)</Label>
                        <Textarea value={data.subtitleEn} onChange={(e) => handleChange("subtitleEn", e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Subtitle (Indonesian)</Label>
                        <Textarea value={data.subtitleId} onChange={(e) => handleChange("subtitleId", e.target.value)} disabled={loading} />
                    </div>
                </div>

                <Button onClick={onSubmit} disabled={loading} className="bg-blue-900 w-full">
                    Save Testimonials Settings
                </Button>
            </div>
        </div>
    );
};
