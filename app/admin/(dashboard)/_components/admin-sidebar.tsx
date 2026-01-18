"use client";

import Link from "next/link";
import { LayoutDashboard, Package, FolderOpen, LogOut, User, FileText, MessageSquareQuote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    userRole?: string;
}

export function AdminSidebar({ isCollapsed, onToggle, userRole }: AdminSidebarProps) {
    const pathname = usePathname();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/admin/login" });
    };

    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/categories", label: "Categories", icon: FolderOpen },
        { href: "/admin/clients", label: "Clients", icon: User },
        { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
        { href: "/admin/content", label: "Site Content", icon: FileText },
    ];

    if (userRole === "superadmin") {
        links.push({ href: "/admin/users", label: "User Manager", icon: User });
    }

    return (
        <>
            <aside className={cn(
                "bg-slate-900 text-white fixed h-full z-10 transition-all duration-300 flex flex-col hidden md:flex",
                isCollapsed ? "w-20" : "w-64"
            )}>
                {/* Header */}
                <div className={cn(
                    "p-4 border-b border-slate-800 flex items-center",
                    isCollapsed ? "justify-center flex-col gap-4" : "justify-between"
                )}>
                    <div className={cn("flex items-center gap-3", isCollapsed && "hidden")}>
                        <div className="relative w-8 h-8 flex-shrink-0">
                            <Image
                                src="/images/logo.png"
                                alt="Baruna Teknik Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="font-oswald text-xl font-bold tracking-wider animate-in fade-in duration-300">
                            ADMIN
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggle}
                        className={cn("text-slate-400 hover:bg-blue-600 hover:text-white", isCollapsed && "mx-auto")}
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 flex-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group relative",
                                    isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300 hover:text-white",
                                    isCollapsed && "justify-center px-2"
                                )}
                                title={isCollapsed ? link.label : undefined}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {!isCollapsed && <span>{link.label}</span>}

                                {/* Tooltip for collapsed mode */}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
                                        {link.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>



                {/* Logout */}
                <div className="p-4 border-t border-slate-800">
                    <Button
                        variant="ghost"
                        onClick={() => setShowLogoutDialog(true)}
                        className={cn(
                            "w-full text-red-400 hover:text-red-300 hover:bg-slate-800 gap-3",
                            isCollapsed ? "justify-center px-0" : "justify-start"
                        )}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span>Logout</span>}
                    </Button>
                </div>
            </aside>

            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to log out of the admin panel?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

// Ensure to export types/state if needed by layout wrapper
