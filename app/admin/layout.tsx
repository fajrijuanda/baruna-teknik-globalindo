import Link from "next/link";
import { LayoutDashboard, Package, FolderOpen, Settings, LogOut, User } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white fixed h-full z-10 hidden md:block">
                <div className="p-6 border-b border-slate-800">
                    <div className="font-oswald text-xl font-bold tracking-wider">
                        BARUNA ADMIN
                    </div>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                        <Package className="w-5 h-5" />
                        Products
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                        <FolderOpen className="w-5 h-5" />
                        Categories
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
                    <form action={async () => {
                        "use server";
                        await signOut();
                    }}>
                        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800 gap-3">
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">{session?.user?.email}</span>
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
}
