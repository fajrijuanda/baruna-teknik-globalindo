import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Server Action for Update
async function updateProduct(id: string, formData: FormData) {
    "use server";

    const data = {
        categoryId: formData.get("categoryId") as string,
        titleEn: formData.get("titleEn") as string,
        titleId: formData.get("titleId") as string,
        descEn: formData.get("descEn") as string,
        descId: formData.get("descId") as string,
    };

    await prisma.product.update({
        where: { id },
        data: {
            categoryId: data.categoryId,
            title: { en: data.titleEn, id: data.titleId },
            description: { en: data.descEn, id: data.descId },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id } });
    const categories = await prisma.category.findMany();

    if (!product) return <div>Product not found</div>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const title = (product as any).title as { en: string; id: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const desc = (product as any).description as { en: string; id: string };

    // Bind the ID to the server action
    const updateProductWithId = updateProduct.bind(null, id);

    return (
        <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit Product</h1>

            <form action={updateProductWithId} className="space-y-6">
                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select name="categoryId" defaultValue={product.categoryId} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map(c => (
                                <SelectItem key={c.id} value={c.id}>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(c.name as any).en} / {(c.name as any).id}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Title (English)</Label>
                        <Input name="titleEn" defaultValue={title.en} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Title (Indonesia)</Label>
                        <Input name="titleId" defaultValue={title.id} required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Description (English)</Label>
                        <Input name="descEn" defaultValue={desc.en} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Description (Indonesia)</Label>
                        <Input name="descId" defaultValue={desc.id} required />
                    </div>
                </div>

                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 w-full">
                    Update Product
                </Button>
            </form>
        </div>
    );
}
