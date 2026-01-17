import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/lib/actions/categories";

export default function NewCategoryPage() {
    return (
        <div className="max-w-xl bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Create New Category</h1>

            <form action={createCategory} className="space-y-6">
                <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input name="slug" placeholder="e.g. industrial-pump" required />
                </div>

                <div className="space-y-2">
                    <Label>Name (English)</Label>
                    <Input name="nameEn" placeholder="Industrial Pump" required />
                </div>

                <div className="space-y-2">
                    <Label>Name (Indonesia)</Label>
                    <Input name="nameId" placeholder="Pompa Industri" required />
                </div>

                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 w-full">
                    Create Category
                </Button>
            </form>
        </div>
    );
}
