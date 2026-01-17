import { prisma } from "@/lib/prisma";
import { Package, FolderOpen } from "lucide-react";

export default async function AdminDashboard() {
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Products</p>
                        <p className="text-2xl font-bold text-slate-900">{productCount}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <FolderOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Categories</p>
                        <p className="text-2xl font-bold text-slate-900">{categoryCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
