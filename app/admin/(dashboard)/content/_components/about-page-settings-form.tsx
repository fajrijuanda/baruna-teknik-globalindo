"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ui/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updatePageContent } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { Plus, Trash } from "lucide-react";

interface Milestone {
    year: string;
    titleEn: string;
    titleId: string;
    descriptionEn: string;
    descriptionId: string;
}

interface AboutPageContent {
    vision: {
        titleEn: string;
        titleId: string;
        descriptionEn: string;
        descriptionId: string;
    };
    mission: {
        titleEn: string;
        titleId: string;
        listEn: string[];
        listId: string[];
    };
    ceo: {
        name: string;
        roleEn: string;
        roleId: string;
        titleEn: string;
        titleId: string;
        subtitleEn: string;
        subtitleId: string;
        contentEn: string[];
        contentId: string[];
        image: string;
    };
    organization: {
        titleEn: string;
        titleId: string;
        descriptionEn: string;
        descriptionId: string;
        image: string;
    };
    history: {
        titleEn: string;
        titleId: string;
        descriptionEn: string;
        descriptionId: string;
        milestones: Milestone[];
    };
}

interface SettingsFormProps {
    initialContent: AboutPageContent | null;
}

export const AboutPageSettingsForm: React.FC<SettingsFormProps> = ({ initialContent }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Default Empty State
    const defaultState: AboutPageContent = {
        vision: { titleEn: "", titleId: "", descriptionEn: "", descriptionId: "" },
        mission: { titleEn: "", titleId: "", listEn: [], listId: [] },
        ceo: { name: "", roleEn: "", roleId: "", titleEn: "", titleId: "", subtitleEn: "", subtitleId: "", contentEn: [], contentId: [], image: "" },
        organization: { titleEn: "", titleId: "", descriptionEn: "", descriptionId: "", image: "" },
        history: { titleEn: "", titleId: "", descriptionEn: "", descriptionId: "", milestones: [] }
    };

    const [data, setData] = useState<AboutPageContent>(initialContent || defaultState);

    // Helper to update deep nested state
    const update = (section: keyof AboutPageContent, field: string, value: any) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            await updatePageContent("about", "details", data as any);
            alert("About Page settings updated!");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to update settings");
        } finally {
            setLoading(false);
        }
    };

    // Mission List Helpers
    const handleMissionChange = (lang: 'En' | 'Id', text: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        update("mission", `list${lang}` as any, text.split("\n").filter(line => line.trim() !== ""));
    };

    // CEO Content Helpers
    const handleCeoContentChange = (lang: 'En' | 'Id', text: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        update("ceo", `content${lang}` as any, text.split("\n\n").filter(p => p.trim() !== ""));
    };

    // Milestone Helpers
    const addMilestone = () => {
        const newM: Milestone = { year: "", titleEn: "", titleId: "", descriptionEn: "", descriptionId: "" };
        update("history", "milestones", [...(data.history.milestones || []), newM]);
    };

    const removeMilestone = (idx: number) => {
        const newM = [...(data.history.milestones || [])];
        newM.splice(idx, 1);
        update("history", "milestones", newM);
    };

    const updateMilestone = (idx: number, field: keyof Milestone, value: string) => {
        const newM = [...(data.history.milestones || [])];
        newM[idx] = { ...newM[idx], [field]: value };
        update("history", "milestones", newM);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>About Page Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="vision" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="vision">Vision & Mission</TabsTrigger>
                        <TabsTrigger value="ceo">CEO Message</TabsTrigger>
                        <TabsTrigger value="organization">Organization</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>

                    {/* VISION & MISSION */}
                    <TabsContent value="vision" className="space-y-6">
                        <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                            <h3 className="font-semibold text-lg">Vision</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title (EN)</Label>
                                    <Input value={data.vision?.titleEn || ""} onChange={e => update("vision", "titleEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title (ID)</Label>
                                    <Input value={data.vision?.titleId || ""} onChange={e => update("vision", "titleId", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Description (EN)</Label>
                                    <Textarea value={data.vision?.descriptionEn || ""} onChange={e => update("vision", "descriptionEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description (ID)</Label>
                                    <Textarea value={data.vision?.descriptionId || ""} onChange={e => update("vision", "descriptionId", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                            <h3 className="font-semibold text-lg">Mission</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title (EN)</Label>
                                    <Input value={data.mission?.titleEn || ""} onChange={e => update("mission", "titleEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title (ID)</Label>
                                    <Input value={data.mission?.titleId || ""} onChange={e => update("mission", "titleId", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Mission List (EN) - One/line</Label>
                                    <Textarea
                                        className="min-h-[150px]"
                                        value={(data.mission?.listEn || []).join("\n")}
                                        onChange={e => handleMissionChange("En", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Mission List (ID) - One/line</Label>
                                    <Textarea
                                        className="min-h-[150px]"
                                        value={(data.mission?.listId || []).join("\n")}
                                        onChange={e => handleMissionChange("Id", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* CEO MESSAGE */}
                    <TabsContent value="ceo" className="space-y-6">
                        <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                            <div className="space-y-2">
                                <Label>CEO Image</Label>
                                <ImageUpload
                                    value={data.ceo?.image ? [data.ceo.image] : []}
                                    onChange={url => update("ceo", "image", url)}
                                    onRemove={() => update("ceo", "image", "")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={data.ceo?.name || ""} onChange={e => update("ceo", "name", e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Role (EN)</Label>
                                    <Input value={data.ceo?.roleEn || ""} onChange={e => update("ceo", "roleEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Role (ID)</Label>
                                    <Input value={data.ceo?.roleId || ""} onChange={e => update("ceo", "roleId", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title (EN)</Label>
                                    <Input value={data.ceo?.titleEn || ""} onChange={e => update("ceo", "titleEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title (ID)</Label>
                                    <Input value={data.ceo?.titleId || ""} onChange={e => update("ceo", "titleId", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Subtitle (EN)</Label>
                                    <Input value={data.ceo?.subtitleEn || ""} onChange={e => update("ceo", "subtitleEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Subtitle (ID)</Label>
                                    <Input value={data.ceo?.subtitleId || ""} onChange={e => update("ceo", "subtitleId", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Content (EN) - Paragraphs sep by empty lines</Label>
                                    <Textarea
                                        className="min-h-[200px]"
                                        value={(data.ceo?.contentEn || []).join("\n\n")}
                                        onChange={e => handleCeoContentChange("En", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Content (ID) - Paragraphs sep by empty lines</Label>
                                    <Textarea
                                        className="min-h-[200px]"
                                        value={(data.ceo?.contentId || []).join("\n\n")}
                                        onChange={e => handleCeoContentChange("Id", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* ORGANIZATION */}
                    <TabsContent value="organization" className="space-y-6">
                        <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                            <div className="space-y-2">
                                <Label>Organization Chart Image</Label>
                                <ImageUpload
                                    value={data.organization?.image ? [data.organization.image] : []}
                                    onChange={url => update("organization", "image", url)}
                                    onRemove={() => update("organization", "image", "")}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title (EN)</Label>
                                    <Input value={data.organization?.titleEn || ""} onChange={e => update("organization", "titleEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Title (ID)</Label>
                                    <Input value={data.organization?.titleId || ""} onChange={e => update("organization", "titleId", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Description (EN)</Label>
                                    <Textarea value={data.organization?.descriptionEn || ""} onChange={e => update("organization", "descriptionEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description (ID)</Label>
                                    <Textarea value={data.organization?.descriptionId || ""} onChange={e => update("organization", "descriptionId", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* HISTORY */}
                    <TabsContent value="history" className="space-y-6">
                        <div className="space-y-4 border p-4 rounded-lg bg-slate-50">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Section Title (EN)</Label>
                                    <Input value={data.history?.titleEn || ""} onChange={e => update("history", "titleEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Title (ID)</Label>
                                    <Input value={data.history?.titleId || ""} onChange={e => update("history", "titleId", e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Section Description (EN)</Label>
                                    <Textarea value={data.history?.descriptionEn || ""} onChange={e => update("history", "descriptionEn", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Section Description (ID)</Label>
                                    <Textarea value={data.history?.descriptionId || ""} onChange={e => update("history", "descriptionId", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">Milestones</h3>
                                <Button size="sm" onClick={addMilestone}><Plus className="h-4 w-4 mr-2" /> Add Milestone</Button>
                            </div>

                            {(data.history?.milestones || []).map((milestone, idx) => (
                                <div key={idx} className="flex gap-4 p-4 border rounded-lg bg-white items-start">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                                        <div className="md:col-span-1 space-y-2">
                                            <Label>Year</Label>
                                            <Input value={milestone.year} onChange={e => updateMilestone(idx, "year", e.target.value)} />
                                        </div>
                                        <div className="md:col-span-5 space-y-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <Label className="text-xs">Title (EN)</Label>
                                                    <Input value={milestone.titleEn || ""} onChange={e => updateMilestone(idx, "titleEn", e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label className="text-xs">Title (ID)</Label>
                                                    <Input value={milestone.titleId || ""} onChange={e => updateMilestone(idx, "titleId", e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 space-y-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <Label className="text-xs">Desc (EN)</Label>
                                                    <Textarea value={milestone.descriptionEn || ""} onChange={e => updateMilestone(idx, "descriptionEn", e.target.value)} />
                                                </div>
                                                <div>
                                                    <Label className="text-xs">Desc (ID)</Label>
                                                    <Textarea value={milestone.descriptionId || ""} onChange={e => updateMilestone(idx, "descriptionId", e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => removeMilestone(idx)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <Button onClick={onSubmit} disabled={loading} className="bg-blue-900 w-full mt-8">
                    Save About Page Settings
                </Button>
            </CardContent>
        </Card>
    );
};
