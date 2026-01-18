"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save } from "lucide-react";
import { useStatusModal } from "@/hooks/use-status-modal";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePageContent } from "@/lib/actions/content";

const formSchema = z.object({
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email address"),
    hours: z.string().optional(),
    hoursDesc: z.string().optional(),
    googleMapsUrl: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
});

interface ContactSettingsFormProps {
    initialContent?: {
        address?: string;
        phone?: string;
        email?: string;
        hours?: string;
        hoursDesc?: string;
        googleMapsUrl?: string;
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    };
}

export function ContactSettingsForm({ initialContent }: ContactSettingsFormProps) {
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: initialContent?.address || "",
            phone: initialContent?.phone || "",
            email: initialContent?.email || "",
            hours: initialContent?.hours || "Senin - Jumat: 08:00 - 17:00",
            hoursDesc: initialContent?.hoursDesc || "",
            googleMapsUrl: initialContent?.googleMapsUrl || "",
            facebook: initialContent?.facebook || "",
            instagram: initialContent?.instagram || "",
            linkedin: initialContent?.linkedin || "",
        },
    });

    const { openLoading, openSuccess, openError, StatusDialog } = useStatusModal();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSaving(true);
        openLoading("Saving contact information...");

        try {
            const result = await updatePageContent("contact", "info", values);
            if (result.error) {
                openError(result.error);
            } else {
                openSuccess("Contact info updated successfully");
            }
        } catch {
            openError("An unexpected error occurred while saving.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                            Update your company contact details displayed on the website.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={isSaving} placeholder="Jl. Example No. 123..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSaving} placeholder="+62 21..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSaving} placeholder="admin@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Operating Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="hours"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hours Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSaving} placeholder="Mon - Fri: 08:00 - 17:00" {...field} />
                                    </FormControl>
                                    <FormDescription>Short summary of hours.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hoursDesc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hours Description</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={isSaving} placeholder="Additional info..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Maps & Social Media</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="googleMapsUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Google Maps Embed URL</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSaving}
                                            placeholder="https://maps.google.com/maps?q=..."
                                            className="min-h-[100px] font-mono text-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Paste the &quot;src&quot; attribute from the Google Maps Embed code.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="facebook"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Facebook URL</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSaving} placeholder="https://facebook.com/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram URL</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSaving} placeholder="https://instagram.com/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn URL</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSaving} placeholder="https://linkedin.com/..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving} className="min-w-[150px]">
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Contact Info
                            </>
                        )}
                    </Button>
                </div>
            </form>
            <StatusDialog />
        </Form>
    );
}
