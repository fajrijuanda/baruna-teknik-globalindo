"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct, getCategoryOptions } from "@/lib/actions/products";
import { ImageUpload } from "@/components/admin/ui/image-upload";

const formSchema = z.object({
    slug: z.string().min(1, "Slug is required"),
    categoryId: z.string().min(1, "Category is required"),
    titleEn: z.string().min(1, "English Title is required"),
    titleId: z.string().min(1, "Indonesian Title is required"),
    descEn: z.string().min(1, "English Description is required"),
    descId: z.string().min(1, "Indonesian Description is required"),
    imageUrl: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductDialogProps {
    initialData?: ProductFormValues & { id: string } | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
    initialData,
    open,
    onOpenChange
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            slug: "",
            categoryId: "",
            titleEn: "",
            titleId: "",
            descEn: "",
            descId: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (open) {
            getCategoryOptions().then(setCategories);
            if (!initialData) {
                form.reset({
                    slug: "",
                    categoryId: "",
                    titleEn: "",
                    titleId: "",
                    descEn: "",
                    descId: "",
                    imageUrl: "",
                });
            } else {
                form.reset(initialData);
            }
        }
    }, [open, initialData, form]);

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            let result;
            if (initialData) {
                result = await updateProduct(initialData.id, data);
            } else {
                result = await createProduct(data);
            }

            if (result.success) {
                toast.success(initialData ? "Product updated" : "Product created");
                router.refresh();
                onOpenChange(false);
            } else {
                toast.error(result.error);
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-[860px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                            <h4 className="mb-4 text-sm font-semibold tracking-wide text-slate-700">Basic Information</h4>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="e.g. industrial-water-pump" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                disabled={loading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <h4 className="mb-4 text-sm font-semibold tracking-wide text-slate-700">Multilingual Content</h4>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="titleEn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title (EN)</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Product name in English" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="titleId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title (ID)</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="Nama produk dalam Bahasa Indonesia" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="descEn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description (EN)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={loading}
                                                    placeholder="Short product description in English"
                                                    className="min-h-28 resize-y"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="descId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description (ID)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={loading}
                                                    placeholder="Deskripsi singkat produk dalam Bahasa Indonesia"
                                                    className="min-h-28 resize-y"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Image</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value ? [field.value] : []}
                                                disabled={loading}
                                                onChange={(url) => field.onChange(url)}
                                                onRemove={() => field.onChange("")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button disabled={loading} type="submit">
                                {initialData ? "Save changes" : "Create Product"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
