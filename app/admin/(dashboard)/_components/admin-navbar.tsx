"use client";

import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminNavbar({ userEmail }: { userEmail?: string | null }) {
    return (
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            {/* Search Bar (Replaces Title) */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Search menu..."
                    className="pl-10 border-slate-200 focus:border-blue-500 transition-colors"
                />
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden sm:inline-block">
                        {userEmail || "Admin"}
                    </span>
                </div>
            </div>
        </header>
    );
}
