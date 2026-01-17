"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Search, Home, Info, Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, setLanguage, t } = useLanguage();

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
                    <div className="h-10 w-10 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl font-oswald">
                        B
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
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors flex items-center gap-2 relative group",
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
                                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-current rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher - Flags Only */}
                    <Select value={language} onValueChange={(val: string) => setLanguage(val as 'id' | 'en')}>
                        <SelectTrigger className={cn("w-[60px] h-9 border-none bg-transparent focus:ring-0 focus:ring-offset-0 text-2xl", isScrolled ? "text-slate-900 dark:text-white" : "text-white")}>
                            <SelectValue placeholder="Lang" />
                        </SelectTrigger>
                        <SelectContent align="end" className="min-w-[70px]">
                            <SelectItem value="id" className="text-2xl justify-center">🇮🇩</SelectItem>
                            <SelectItem value="en" className="text-2xl justify-center">🇺🇸</SelectItem>
                        </SelectContent>
                    </Select>

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

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
                                )}
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle className="font-oswald text-left">Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 mt-8">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder={t.nav.searchPlaceholder}
                                        className="pl-9"
                                    />
                                </div>
                                <nav className="flex flex-col gap-4">
                                    {NAV_LINKS.map((link) => {
                                        const isActive = isActiveLink(link.href);
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    "text-lg font-medium transition-colors flex items-center gap-3",
                                                    isActive
                                                        ? "text-blue-600 dark:text-blue-400 font-bold"
                                                        : "text-foreground/80 hover:text-primary"
                                                )}
                                            >
                                                {getIcon(link.label)}
                                                {getTranslatedLabel(link.label)}
                                            </Link>
                                        );
                                    })}
                                </nav>
                                <div className="border-t pt-6">
                                    {/* Mobile Language Switcher - Flags Only */}
                                    <div className="flex gap-2 mb-6 justify-center">
                                        <Button
                                            variant={language === 'id' ? 'default' : 'outline'}
                                            size="lg"
                                            onClick={() => setLanguage('id')}
                                            className="flex-1 text-2xl h-12"
                                        >
                                            🇮🇩
                                        </Button>
                                        <Button
                                            variant={language === 'en' ? 'default' : 'outline'}
                                            size="lg"
                                            onClick={() => setLanguage('en')}
                                            className="flex-1 text-2xl h-12"
                                        >
                                            🇺🇸
                                        </Button>
                                    </div>

                                    <div className="text-sm text-muted-foreground mb-2">
                                        {t.nav.contactUs}
                                    </div>
                                    <div className="font-medium">{SITE_CONFIG.phone}</div>
                                    <div className="text-sm">{SITE_CONFIG.email}</div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
