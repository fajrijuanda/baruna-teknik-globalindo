"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updatePageContent } from "@/lib/actions/content";
import { useRouter } from "next/navigation";

import { IconPicker } from "@/components/admin/ui/icon-picker";

interface FeaturesContent {
    titleEn: string;
    titleId: string;
    subtitleEn: string;
    subtitleId: string;
    // Card 1
    card1Icon: string;
    card1TitleEn: string;
    card1TitleId: string;
    card1DescEn: string;
    card1DescId: string;
    // Card 2
    card2Icon: string;
    card2TitleEn: string;
    card2TitleId: string;
    card2DescEn: string;
    card2DescId: string;
    // Card 3
    card3Icon: string;
    card3TitleEn: string;
    card3TitleId: string;
    card3DescEn: string;
    card3DescId: string;
    // Card 4
    card4Icon: string;
    card4TitleEn: string;
    card4TitleId: string;
    card4DescEn: string;
    card4DescId: string;
}

interface SettingsFormProps {
    initialContent: FeaturesContent | null;
}

export const FeaturesSettingsForm: React.FC<SettingsFormProps> = ({ initialContent }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<FeaturesContent>(initialContent || {
        titleEn: "",
        titleId: "",
        subtitleEn: "",
        subtitleId: "",
        card1Icon: "BadgeCheck",
        card1TitleEn: "",
        card1TitleId: "",
        card1DescEn: "",
        card1DescId: "",
        card2Icon: "Cog",
        card2TitleEn: "",
        card2TitleId: "",
        card2DescEn: "",
        card2DescId: "",
        card3Icon: "Truck",
        card3TitleEn: "",
        card3TitleId: "",
        card3DescEn: "",
        card3DescId: "",
        card4Icon: "ShieldCheck",
        card4TitleEn: "",
        card4TitleId: "",
        card4DescEn: "",
        card4DescId: "",
    });

    const handleChange = (key: keyof FeaturesContent, value: string) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            await updatePageContent("home", "features", data);
            alert("Features settings updated!");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    const renderCardFields = (num: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const iconKey = `card${num}Icon` as keyof FeaturesContent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const titleEnKey = `card${num}TitleEn` as keyof FeaturesContent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const titleIdKey = `card${num}TitleId` as keyof FeaturesContent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const descEnKey = `card${num}DescEn` as keyof FeaturesContent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const descIdKey = `card${num}DescId` as keyof FeaturesContent;

        return (
            <div className="border p-4 rounded-lg bg-slate-50 space-y-4">
                <h3 className="font-semibold text-lg">Card {num}</h3>
                <div className="space-y-2">
                    <Label>Icon</Label>
                    <IconPicker value={data[iconKey] || ""} onChange={(val) => handleChange(iconKey, val)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Title (EN)</Label>
                        <Input value={data[titleEnKey]} onChange={(e) => handleChange(titleEnKey, e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Title (ID)</Label>
                        <Input value={data[titleIdKey]} onChange={(e) => handleChange(titleIdKey, e.target.value)} disabled={loading} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Description (EN)</Label>
                        <Textarea value={data[descEnKey]} onChange={(e) => handleChange(descEnKey, e.target.value)} disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description (ID)</Label>
                        <Textarea value={data[descIdKey]} onChange={(e) => handleChange(descIdKey, e.target.value)} disabled={loading} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-semibold">Features Section Settings</h3>

            <div className="space-y-8">
                <div className="space-y-4 border-b pb-6">
                    <h3 className="font-semibold text-lg">Header</h3>
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
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {renderCardFields(1)}
                    {renderCardFields(2)}
                    {renderCardFields(3)}
                    {renderCardFields(4)}
                </div>

                <Button onClick={onSubmit} disabled={loading} className="bg-blue-900 w-full sticky bottom-4">
                    Save Features Settings
                </Button>
            </div>
        </div>
    );
};
