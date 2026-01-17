"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/shared/search-bar";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { PageHeader } from "@/components/shared/page-header";

// Types matching Prisma + JSON
interface BilingualString {
    en: string;
    id: string;
}

interface Category {
    id: string;
    name: any; // Json
    slug: string;
}

interface Product {
    id: string;
    title: any; // Json
    description: any; // Json
    slug: string;
    category: {
        id: string;
        name: any; // Json
    };
    images: {
        url: string;
    }[];
}

interface ProductFeedProps {
    products: Product[];
    categories: Category[];
}

export function ProductFeed({ products, categories }: ProductFeedProps) {
    const { t, language } = useLanguage();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");

    // Helper to safely get string from Json
    const getString = (json: any) => {
        if (!json) return "";
        return (json as BilingualString)[language as keyof BilingualString] || "";
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <PageHeader
                title={t.productsPage.header.title}
                subtitle={t.productsPage.header.subtitle}
            />

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col md:flex-row justify-end items-end mb-8 gap-4">
                    <div className="w-full md:w-72">
                        <Suspense fallback={<div>Loading search...</div>}>
                            <SearchInput />
                        </Suspense>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 sticky top-24 shadow-sm">
                            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                                {t.productsPage.categories}
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/products"
                                        className={`block px-3 py-2 rounded-lg font-medium text-sm border transition-colors ${!activeCategory
                                            ? "bg-blue-50 text-blue-600 border-blue-100"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent"
                                            }`}
                                    >
                                        {t.productsPage.allProducts}
                                    </Link>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            href={`/products?category=${cat.id}`}
                                            className={`block px-3 py-2 rounded-lg font-medium text-sm border transition-colors ${activeCategory === cat.id
                                                ? "bg-blue-50 text-blue-600 border-blue-100"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent"
                                                }`}
                                        >
                                            {getString(cat.name)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                                    {t.productsPage.needHelp}
                                </h3>
                                <p className="text-slate-500 text-sm mb-4">
                                    {t.productsPage.needHelpDesc}
                                </p>
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white uppercase font-bold text-xs">
                                    {t.productsPage.contactSales}
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {products.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                                <p className="text-slate-500 text-lg">No products found.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        title={getString(product.title)}
                                        description={getString(product.description)}
                                        category={getString(product.category.name)}
                                        image={product.images[0]?.url || "https://placehold.co/600x400?text=No+Image"}
                                        viewSpecText={t.productsPage.viewSpec}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination Placeholder (Can be implemented with server pagination later) */}
                    </div>
                </div>
            </div>
        </div>
    );
}
