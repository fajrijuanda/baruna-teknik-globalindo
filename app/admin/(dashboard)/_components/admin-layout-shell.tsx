"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminNavbar } from "./admin-navbar";
import { cn } from "@/lib/utils";

interface AdminLayoutShellProps {
    children: React.ReactNode;
    userEmail?: string | null;
    userRole?: string;
}

export function AdminLayoutShell({ children, userEmail, userRole }: AdminLayoutShellProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
            {/* Sidebar */}
            <AdminSidebar
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
                userRole={userRole}
            />

            {/* Main Content */}
            <main className={cn(
                "flex-1 min-w-0 transition-all duration-300 px-4 py-6 md:px-8",
                isCollapsed ? "md:ml-20" : "md:ml-64"
            )}>
                <AdminNavbar userEmail={userEmail} />
                {children}
            </main>
        </div>
    );
}
