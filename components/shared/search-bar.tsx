"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function SearchInput({ className }: { className?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const debouncedQuery = useDebounce(query, 500);

    const handleSearch = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set("q", term);
            } else {
                params.delete("q");
            }
            router.push(`/products?${params.toString()}`);
        },
        [router, searchParams]
    );

    useEffect(() => {
        // Only trigger search if query changes and we are not on initial load matching URL
        if (debouncedQuery !== searchParams.get("q")) {
            handleSearch(debouncedQuery);
        }
    }, [debouncedQuery, handleSearch, searchParams]);

    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
                type="search"
                placeholder="Search products..."
                className="pl-9 bg-white border-gray-200 focus:border-red-500 rounded-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
