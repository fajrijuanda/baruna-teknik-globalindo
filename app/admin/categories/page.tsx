import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Plus, Trash2 } from "lucide-react";
import { deleteCategory } from "@/lib/actions/categories";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { slug: "asc" },
        include: { _count: { select: { products: true } } }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
                <Button asChild className="bg-blue-900 hover:bg-blue-800">
                    <Link href="/admin/categories/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                    </Link>
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Name (EN)</th>
                            <th className="px-6 py-4 font-medium">Name (ID)</th>
                            <th className="px-6 py-4 font-medium">Slug</th>
                            <th className="px-6 py-4 font-medium">Products</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {categories.map((category) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const name = (category as any).name as { en: string; id: string };
                            return (
                                <tr key={category.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {name?.en}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {name?.id}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                        {category.slug}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {category._count.products}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <form action={deleteCategory.bind(null, category.id)}>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </td>
                                </tr>
                            );
                        })}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
