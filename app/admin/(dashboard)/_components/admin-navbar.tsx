"use client";

import Link from "next/link";
import { User, Search, Settings, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminNavbar({ userEmail }: { userEmail?: string | null }) {
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/admin/login" });
    };

    return (
        <header className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            {/* Search Bar (Replaces Title) */}
            <div className="relative w-full max-w-md min-w-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Search menu..."
                    className="pl-10 border-slate-200 focus:border-blue-500 transition-colors"
                />
            </div>

            {/* User Profile */}
            <div className="pl-0 sm:pl-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-auto rounded-full border border-slate-200 bg-slate-50 px-3 py-2 hover:bg-slate-100"
                        >
                            <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
                                <User className="h-4 w-4 text-blue-600" />
                            </span>
                            <span className="hidden max-w-[160px] truncate text-sm font-medium text-slate-700 sm:inline-block">
                                {userEmail || "Admin"}
                            </span>
                            <ChevronDown className="ml-2 h-4 w-4 text-slate-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuLabel className="truncate">{userEmail || "Admin"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/admin/content" className="cursor-pointer">
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 focus:text-red-600"
                        >
                            <LogOut className="h-4 w-4" />
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
