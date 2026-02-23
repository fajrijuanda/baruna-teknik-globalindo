"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Home, Info, Package, Phone } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";


import { NAV_LINKS, PRODUCT_BRANDS_MENU } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getIcon = (label: string) => {
        switch (label) {
            case "Home":
                return <Home className="h-4 w-4" />;
            case "About Us":
                return <Info className="h-4 w-4" />;
            case "Products":
                return <Package className="h-4 w-4" />;
            case "Contact":
                return <Phone className="h-4 w-4" />;
            default:
                return null;
        }
    };

    // Helper to get translated nav label
    const getTranslatedLabel = (originalLabel: string) => {
        switch (originalLabel) {
            case "Home": return t.nav.home;
            case "About Us": return t.nav.about;
            case "Products": return t.nav.products;
            case "Contact": return t.nav.contact;
            default: return originalLabel;
        }
    };

    // Helper to check if link is active
    const isActiveLink = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-black/80"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-10 w-10">
                        <Image
                            src="/images/logo.png"
                            alt="Baruna Teknik"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span
                        className={cn(
                            "text-xl font-bold font-oswald tracking-tight hidden md:block",
                            isScrolled ? "text-slate-900 dark:text-white" : "text-white"
                        )}
                    >
                        BARUNA TEKNIK
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = isActiveLink(link.href);
                        if (link.label === "Products") {
                            return (
                                <div key={link.href} className="relative group">
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-sm font-medium transition-colors flex items-center gap-2 py-6",
                                            isActive
                                                ? "text-blue-600 dark:text-blue-400 font-bold"
                                                : isScrolled
                                                    ? "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
                                                    : "text-white/90 hover:text-white"
                                        )}
                                    >
                                        {getIcon(link.label)}
                                        {getTranslatedLabel(link.label)}
                                        {isActive && (
                                            <span className="absolute bottom-4 left-0 w-full h-[2px] bg-current rounded-full" />
                                        )}
                                    </Link>

                                    {/* First Level Dropdown (Categories) */}
                                    <div className="absolute top-[80px] left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-100 dark:border-slate-800 py-2">
                                            {PRODUCT_BRANDS_MENU.map((category) => (
                                                <div key={category.slug} className="relative group/sub">
                                                    <div className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 cursor-pointer flex justify-between items-center transition-colors">
                                                        <span>{category.category}</span>
                                                        <span className="text-xs">▶</span>
                                                    </div>

                                                    {/* Second Level Dropdown (Brands) */}
                                                    <div className="absolute top-0 left-full w-48 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 transform -translate-x-2 group-hover/sub:translate-x-0">
                                                        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-100 dark:border-slate-800 py-2 ml-1">
                                                            {category.brands.map((brand) => (
                                                                <Link
                                                                    key={brand.slug}
                                                                    href={`/brands/${category.slug}/${brand.slug}`}
                                                                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
                                                                >
                                                                    {brand.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors flex items-center gap-2 py-6 relative group",
                                    isActive
                                        ? "text-blue-600 dark:text-blue-400 font-bold"
                                        : isScrolled
                                            ? "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
                                            : "text-white/90 hover:text-white"
                                )}
                            >
                                {getIcon(link.label)}
                                {getTranslatedLabel(link.label)}
                                {/* Active Indicator Dot */}
                                {isActive && (
                                    <span className="absolute bottom-4 left-0 w-full h-[2px] bg-current rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">


                    <div className="relative w-64">
                        <Search
                            className={cn(
                                "absolute left-2.5 top-2.5 h-4 w-4",
                                isScrolled ? "text-muted-foreground" : "text-white/70"
                            )}
                        />
                        <Input
                            type="search"
                            placeholder={t.nav.searchPlaceholder}
                            className={cn(
                                "pl-9 h-9 border-none focus-visible:ring-1",
                                isScrolled
                                    ? "bg-secondary/50"
                                    : "bg-white/10 text-white placeholder:text-white/60"
                            )}
                        />
                    </div>

                </div>

                {/* Mobile Navigation (Logo + Lang Only) */}
                <div className="md:hidden flex items-center gap-4">

                </div>
            </div>
        </header>
    );
}
