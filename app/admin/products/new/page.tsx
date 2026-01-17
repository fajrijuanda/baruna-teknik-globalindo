import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../../../components/ui/label";
import { prisma } from "@/lib/prisma";
import { createProduct } from "@/lib/actions/products";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default async function NewProductPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Create New Product</h1>

            <form action={createProduct} className="space-y-6">
                <div className="space-y-2">
                    <Label>Slug (URL Friendly)</Label>
                    <Input name="slug" placeholder="e.g. industrial-pump-x1" required />
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Select name="categoryId" required>
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
                        <Input name="titleEn" placeholder="Product Name EN" required />
                    </div>
                    <div className="space-y-2">
                        <Label>Title (Indonesia)</Label>
                        <Input name="titleId" placeholder="Nama Produk ID" required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Description (English)</Label>
                        <Input name="descEn" placeholder="Description EN" required />
                    </div>
                    <div className="space-y-2">
                        <Label>Description (Indonesia)</Label>
                        <Input name="descId" placeholder="Deskripsi ID" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input name="imageUrl" placeholder="https://example.com/image.jpg" />
                </div>

                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 w-full">
                    Create Product
                </Button>
            </form>
        </div>
    );
}
