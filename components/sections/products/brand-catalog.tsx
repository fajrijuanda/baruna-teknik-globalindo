"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/shared/search-bar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { PageHeader } from "@/components/shared/page-header";
import { PRODUCT_BRANDS_MENU, BrandMenuLink } from "@/lib/constants";
import { CLIENTS } from "@/lib/data/static";

export function BrandCatalog() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");

    const displayBrands: { category: string, categorySlug: string, brand: BrandMenuLink }[] = [];

    PRODUCT_BRANDS_MENU.forEach(cat => {
        if (!activeCategory || activeCategory === cat.slug) {
            cat.brands.forEach(brand => {
                displayBrands.push({
                    category: cat.category,
                    categorySlug: cat.slug,
                    brand: brand
                });
            });
        }
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <PageHeader
                title={t.productsPage.header.title || "Katalog Produk"}
                subtitle={t.productsPage.header.subtitle || "Temukan berbagai macam merek industri terkemuka yang kami sediakan."}
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
                                Kategori
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
                                        Semua Merek
                                    </Link>
                                </li>
                                {PRODUCT_BRANDS_MENU.map((cat) => (
                                    <li key={cat.slug}>
                                        <Link
                                            href={`/products?category=${cat.slug}`}
                                            className={`block px-3 py-2 rounded-lg font-medium text-sm border transition-colors ${activeCategory === cat.slug
                                                ? "bg-blue-50 text-blue-600 border-blue-100"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-transparent"
                                                }`}
                                        >
                                            {cat.category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                                    Butuh Bantuan?
                                </h3>
                                <p className="text-slate-500 text-sm mb-4">
                                    Hubungi tim sales kami untuk informasi lebih lanjut.
                                </p>
                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white uppercase font-bold text-xs" onClick={() => window.open('https://wa.me/6287788487287', '_blank')}>
                                    Hubungi Sales
                                </Button>
                            </div>
                        </div>
                    </aside>

                    {/* Brand Grid */}
                    <div className="flex-1">
                        {displayBrands.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                                <p className="text-slate-500 text-lg">Tidak ada merek ditemukan.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayBrands.map(({ category, categorySlug, brand }) => {
                                    const clientData = CLIENTS.find(c => c.name.toLowerCase() === brand.name.toLowerCase());
                                    const logoUrl = clientData?.logoUrl || "/images/placeholder.jpg";

                                    return (
                                        <Link
                                            key={`${categorySlug}-${brand.slug}`}
                                            href={`/brands/${categorySlug}/${brand.slug}`}
                                            className="group"
                                        >
                                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform group-hover:-translate-y-1 group-hover:border-blue-200 dark:group-hover:border-blue-900/50">
                                                {/* Image Container */}
                                                <div className="w-full aspect-video relative rounded-xl mb-4 bg-slate-50 flex items-center justify-center p-4">
                                                    <Image
                                                        src={logoUrl}
                                                        alt={brand.name}
                                                        fill
                                                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Content info */}
                                                <div className="flex-1 flex flex-col items-center text-center">
                                                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">{category}</div>
                                                    <h3 className="text-xl font-bold font-oswald text-slate-900 dark:text-white mb-2">{brand.name}</h3>
                                                    <p className="text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 w-full group-hover:text-blue-600 transition-colors">
                                                        Lihat Detail Produk →
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
