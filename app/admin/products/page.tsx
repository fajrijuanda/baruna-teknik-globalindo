import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/products";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Products</h1>
                <Button asChild className="bg-blue-900 hover:bg-blue-800">
                    <Link href="/admin/products/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Product Name (EN)</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map((product) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const title = (product as any).title as { en: string; id: string };
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const catName = (product.category as any)?.name as { en: string; id: string } | undefined;

                            return (
                                <tr key={product.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {title?.en || "No Title"}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {catName?.en || "Uncategorized"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Pencil className="w-4 h-4 text-slate-500" />
                                                </Link>
                                            </Button>
                                            <form action={deleteProduct.bind(null, product.id)}>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                                    No products found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
