"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Package, Phone } from "lucide-react";
import { NAV_LINKS, PRODUCT_BRANDS_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
export function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Optional: Hide on scroll down, show on scroll up (like Instagram/Facebook)
    // For now, let's keep it fixed as per "layaknya aplikasi mobile" (usually fixed)

    const getIcon = (label: string, isActive: boolean) => {
        const className = cn("h-6 w-6 mb-1 transition-all", isActive ? "scale-110" : "scale-100");
        switch (label) {
            case "Home":
                return <Home className={className} />;
            case "About Us":
                return <Info className={className} />;
            case "Products":
                return <Package className={className} />;
            case "Contact":
                return <Phone className={className} />;
            default:
                return null;
        }
    };

    const getTranslatedLabel = (originalLabel: string) => {
        switch (originalLabel) {
            case "Home": return t.nav.home;
            case "About Us": return t.nav.about;
            case "Products": return t.nav.products;
            case "Contact": return t.nav.contact;
            default: return originalLabel;
        }
    };

    const isActiveLink = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 md:hidden safe-area-bottom pb-safe">
            <nav className="flex items-center justify-around h-16">
                {NAV_LINKS.map((link) => {
                    const isActive = isActiveLink(link.href);
                    if (link.label === "Products") {
                        return (
                            <Sheet key={link.href} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                                <SheetTrigger asChild>
                                    <button
                                        className={cn(
                                            "flex flex-col items-center justify-center w-full h-full px-2 transition-colors active:scale-95",
                                            isActive
                                                ? "text-blue-600 dark:text-blue-400 font-bold"
                                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                        )}
                                    >
                                        {getIcon(link.label, isActive)}
                                        <span className="text-[10px] font-medium leading-none mt-1">
                                            {getTranslatedLabel(link.label)}
                                        </span>
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl px-0 pb-0">
                                    <SheetHeader className="px-6 pb-4 border-b">
                                        <SheetTitle className="text-left font-oswald text-xl uppercase tracking-widest">{t.nav.products}</SheetTitle>
                                    </SheetHeader>
                                    <div className="overflow-y-auto h-[calc(100%-80px)] px-6 py-4 pb-24">
                                        <div className="space-y-4">
                                            {PRODUCT_BRANDS_MENU.map((category) => (
                                                <div key={category.slug} className="border rounded-xl overflow-hidden shadow-sm">
                                                    <button
                                                        onClick={() => setOpenCategory(openCategory === category.slug ? null : category.slug)}
                                                        className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 font-medium"
                                                    >
                                                        <span>{category.category}</span>
                                                        <ChevronDown className={cn("h-5 w-5 transition-transform", openCategory === category.slug && "rotate-180")} />
                                                    </button>
                                                    {openCategory === category.slug && (
                                                        <div className="bg-white dark:bg-black p-2 border-t">
                                                            {category.brands.map((brand) => (
                                                                <Link
                                                                    key={brand.slug}
                                                                    href={`/brands/${category.slug}/${brand.slug}`}
                                                                    onClick={() => setIsSheetOpen(false)}
                                                                    className="block px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md transition-colors"
                                                                >
                                                                    {brand.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        );
                    }

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full px-2 transition-colors active:scale-95",
                                isActive
                                    ? "text-blue-600 dark:text-blue-400 font-bold"
                                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                            )}
                        >
                            {getIcon(link.label, isActive)}
                            <span className="text-[10px] font-medium leading-none mt-1">
                                {getTranslatedLabel(link.label)}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
