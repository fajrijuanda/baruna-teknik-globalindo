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
            <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="e.g. product-slug" {...field} />
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

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="titleEn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title (EN)</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Product Name" {...field} />
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
                                            <Input disabled={loading} placeholder="Nama Produk" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="descEn"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description (EN)</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder="Description" {...field} />
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
                                            <Input disabled={loading} placeholder="Deskripsi" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
