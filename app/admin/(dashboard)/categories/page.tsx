import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/data-table/data-table";
import { columns, CategoryColumn } from "@/components/admin/categories/columns";
import { Button } from "@/components/ui/button"; // Keeping if needed strictly, but wrapper handles it
import { CategoryDialogWrapper } from "./_components/category-dialog-wrapper";

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { slug: "asc" },
        include: { _count: { select: { products: true } } }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nameEn: (item.name as any)?.en || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        nameId: (item.name as any)?.id || "",
        slug: item.slug,
        productCount: item._count.products,
    }));

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
                    <p className="text-slate-500">Manage product categories</p>
                </div>
                <CategoryDialogWrapper />
            </div>
            <DataTable searchKey="nameEn" columns={columns} data={formattedCategories} />
        </div>
    );
}
