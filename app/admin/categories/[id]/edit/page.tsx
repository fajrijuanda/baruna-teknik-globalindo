import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Server Action for Update
async function updateCategory(id: string, formData: FormData) {
    "use server";

    const data = {
        nameEn: formData.get("nameEn") as string,
        nameId: formData.get("nameId") as string,
    };

    await prisma.category.update({
        where: { id },
        data: {
            name: { en: data.nameEn, id: data.nameId },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
    });

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
}

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const category = await prisma.category.findUnique({ where: { id } });

    if (!category) return <div>Category not found</div>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const name = (category as any).name as { en: string; id: string };
    const updateCategoryWithId = updateCategory.bind(null, id);

    return (
        <div className="max-w-xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Edit Category</h1>

            <form action={updateCategoryWithId} className="space-y-6">
                <div className="space-y-2">
                    <Label>Name (English)</Label>
                    <Input name="nameEn" defaultValue={name.en} required />
                </div>

                <div className="space-y-2">
                    <Label>Name (Indonesia)</Label>
                    <Input name="nameId" defaultValue={name.id} required />
                </div>

                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 w-full">
                    Update Category
                </Button>
            </form>
        </div>
    );
}
