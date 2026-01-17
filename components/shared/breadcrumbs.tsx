"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ className }: { className?: string }) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((segment) => segment !== "");

    if (segments.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-gray-500 mb-6", className)}>
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-red-600 transition-colors flex items-center">
                        <Home className="w-4 h-4" />
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize and replace hyphens

                    return (
                        <li key={href} className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                            {isLast ? (
                                <span className="font-medium text-navy-900 truncate max-w-[200px]" aria-current="page">
                                    {label}
                                </span>
                            ) : (
                                <Link href={href} className="hover:text-red-600 transition-colors">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
