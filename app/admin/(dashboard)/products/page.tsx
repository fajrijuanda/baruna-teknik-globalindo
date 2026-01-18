import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/data-table/data-table";
import { columns, ProductColumn } from "@/components/admin/products/columns";
import { format } from "date-fns";
import { ProductDialogWrapper } from "./_components/product-dialog-wrapper";

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            images: true
        },
        orderBy: { createdAt: "desc" },
    });

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        titleEn: (item.title as any)?.en || "No Title",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        titleId: (item.title as any)?.id || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        category: (item.category.name as any)?.en || "Uncategorized",
        categoryId: item.categoryId,
        slug: item.slug,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descEn: (item.description as any)?.en || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descId: (item.description as any)?.id || "",
        imageUrl: item.images[0]?.url || "",
        isFeatured: item.isFeatured,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                    <p className="text-slate-500">Manage your product catalog</p>
                </div>
                {/* For Products, we keep the specialized /new page as it's complex, unless simplified dialog is strictly required. 
                    The user asked for "add new" to use a dialog. 
                    I will stick with Link to /new for now as a fully featured form is safer than cramping into a dialog, 
                    BUT I will respect the user request if possible. 
                    Actually, constructing a full multi-lang, multi-image product form in a Dialog is heavy but doable.
                    For verified speed, I'll keep the separate page but style it to look integrated, or just use the Link as "Add New".
                    The user said "bagian add newnya tolong gunakan dialog".
                    OK, I will try to make a ProductDialog.
                */}
                <ProductDialogWrapper />
            </div>
            <DataTable searchKey="titleEn" columns={columns} data={formattedProducts} />
        </div>
    );
}
