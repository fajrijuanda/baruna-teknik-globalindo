"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCategory, updateCategory } from "@/lib/actions/categories";

const formSchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    nameEn: z.string().min(1, "English Name is required"),
    nameId: z.string().min(1, "Indonesian Name is required"),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryDialogProps {
    initialData?: CategoryFormValues & { id: string } | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CategoryDialog: React.FC<CategoryDialogProps> = ({
    initialData,
    open,
    onOpenChange
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            slug: "",
            nameEn: "",
            nameId: "",
        },
    });

    // Reset form when initialData changes or dialog opens (optional but good practice)
    // For now rely on key or re-mount if needed, or useEffect. 
    // Usually standardized by parent mounting behavior or key.

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            let result;
            if (initialData) {
                result = await updateCategory(initialData.id, data);
            } else {
                result = await createCategory(data);
            }

            if (result.success) {
                toast.success(initialData ? "Category updated" : "Category created");
                router.refresh();
                onOpenChange(false);
                form.reset();
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Category" : "Add New Category"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="e.g. industrial-pump" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nameEn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (English)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Industrial Pump" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nameId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (Indonesia)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Pompa Industri" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end w-full">
                            <Button disabled={loading} type="submit">
                                {initialData ? "Save changes" : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
