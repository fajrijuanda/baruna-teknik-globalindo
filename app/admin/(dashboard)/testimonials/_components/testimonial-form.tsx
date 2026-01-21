"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonial";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { BilingualContent } from "@/lib/types";

// ============================================================================
// Form Schema & Types
// ============================================================================

const formSchema = z.object({
    clientId: z.string().min(1, "Client is required"),
    personName: z.string().min(1, "Person name is required"),
    personRole: z.string().min(1, "Role is required"),
    contentEn: z.string().min(1, "English content is required"),
    contentId: z.string().min(1, "Indonesian content is required"),
    rating: z.coerce.number().min(1).max(5),
    isVisible: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Initial data shape when editing an existing testimonial
 */
interface TestimonialInitialData {
    id: string;
    clientId: string;
    personName: string;
    personRole: string;
    content?: BilingualContent;
    rating: number;
    isVisible: boolean;
}

interface TestimonialFormProps {
    initialData?: TestimonialInitialData;
    clients: { id: string; name: string }[];
    onClose?: () => void;
}

// ============================================================================
// Component
// ============================================================================

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
    initialData,
    clients,
    onClose,
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const defaultValues: FormValues = initialData
        ? {
            clientId: initialData.clientId,
            personName: initialData.personName,
            personRole: initialData.personRole,
            contentEn: initialData.content?.en || "",
            contentId: initialData.content?.id || "",
            rating: initialData.rating,
            isVisible: initialData.isVisible,
        }
        : {
            clientId: "",
            personName: "",
            personRole: "",
            contentEn: "",
            contentId: "",
            rating: 5,
            isVisible: true,
        };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as never, // Type assertion for zod v4 compatibility
        defaultValues,
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            setLoading(true);
            const data = {
                clientId: values.clientId,
                personName: values.personName,
                personRole: values.personRole,
                contentEn: values.contentEn,
                contentId: values.contentId,
                rating: values.rating,
                isVisible: values.isVisible,
            };

            if (initialData) {
                await updateTestimonial(initialData.id, data);
                toast.success("Testimonial updated");
            } else {
                await createTestimonial(data);
                toast.success("Testimonial created");
            }
            router.refresh();
            if (onClose) onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client</FormLabel>
                            <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a client" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {clients.map((client) => (
                                        <SelectItem key={client.id} value={client.id}>
                                            {client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="personName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Person Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="personRole"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role / Job Title</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Manager" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="contentEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content (English)</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Testimonial in English" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contentId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content (Indonesian)</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Testimonial in Indonesian" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating (1-5)</FormLabel>
                                <FormControl>
                                    <Input type="number" min={1} max={5} disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isVisible"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Visible on Home Page
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <Button disabled={loading} className="ml-auto w-full" type="submit">
                    {initialData ? "Save Changes" : "Create Testimonial"}
                </Button>
            </form>
        </Form>
    );
};
