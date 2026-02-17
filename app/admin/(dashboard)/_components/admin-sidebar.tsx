"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    FolderOpen,
    LogOut,
    Users,
    FileText,

    ChevronLeft,
    ChevronRight,
    Building2,
    type LucideIcon,
} from "lucide-react";
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

// ============================================================================
// Types
// ============================================================================

interface NavLink {
    href: string;
    label: string;
    icon: LucideIcon;
}

interface NavGroup {
    title: string;
    links: NavLink[];
}

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    userRole?: string;
}

// ============================================================================
// Navigation Configuration
// ============================================================================

function getNavigationGroups(userRole?: string): NavGroup[] {
    const groups: NavGroup[] = [
        {
            title: "Overview",
            links: [
                { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
            ],
        },
        {
            title: "Catalog",
            links: [
                { href: "/admin/products", label: "Products", icon: Package },
                { href: "/admin/categories", label: "Categories", icon: FolderOpen },
            ],
        },
        {
            title: "Business",
            links: [
                { href: "/admin/clients", label: "Clients", icon: Building2 },

            ],
        },
        {
            title: "Content",
            links: [
                { href: "/admin/content", label: "Site Content", icon: FileText },
            ],
        },
    ];

    // Admin-only section
    if (userRole === "superadmin") {
        groups.push({
            title: "Administration",
            links: [
                { href: "/admin/users", label: "User Manager", icon: Users },
            ],
        });
    }

    return groups;
}

// ============================================================================
// Component
// ============================================================================

export function AdminSidebar({ isCollapsed, onToggle, userRole }: AdminSidebarProps) {
    const pathname = usePathname();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/admin/login" });
    };

    const navigationGroups = getNavigationGroups(userRole);

    return (
        <>
            <aside className={cn(
                "bg-slate-900 text-white fixed h-full z-10 transition-all duration-300 flex flex-col hidden md:flex overflow-x-hidden",
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
                <nav className="p-4 flex-1 overflow-y-auto overflow-x-hidden">
                    {navigationGroups.map((group, groupIndex) => (
                        <div key={group.title} className={cn(groupIndex > 0 && "mt-6")}>
                            {/* Group Title */}
                            {!isCollapsed && (
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">
                                    {group.title}
                                </h3>
                            )}
                            {isCollapsed && groupIndex > 0 && (
                                <div className="border-t border-slate-700 mb-2 mx-2" />
                            )}

                            {/* Group Links */}
                            <div className="space-y-1">
                                {group.links.map((link) => {
                                    const isActive = pathname === link.href ||
                                        (link.href !== "/admin" && pathname.startsWith(link.href));
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "flex w-full items-center gap-3 px-4 py-2.5 rounded-lg transition-colors relative",
                                                isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300 hover:text-white",
                                                isCollapsed && "justify-center px-2"
                                            )}
                                            title={isCollapsed ? link.label : undefined}
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            {!isCollapsed && <span className="text-sm">{link.label}</span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
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
