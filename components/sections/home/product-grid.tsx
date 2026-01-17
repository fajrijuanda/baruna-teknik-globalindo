"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shared/product-card";
import { SectionHeader } from "@/components/shared/section-header";
import { useLanguage } from "@/components/providers/language-provider";

interface BilingualString {
    [key: string]: string;
}

interface Product {
    id: string;
    title: any;
    description: any;
    slug: string;
    category: {
        name: any;
    };
    images: {
        url: string;
    }[];
}

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    const { t, language } = useLanguage();

    // Helper to safely get string from Json
    const getString = (json: unknown): string => {
        if (!json || typeof json !== 'object') return "";
        const bilingual = json as BilingualString;
        return bilingual[language] || bilingual['en'] || "";
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <SectionHeader
                        title={t.home.featuredProducts.title}
                        subtitle={t.home.featuredProducts.subtitle}
                        className="mb-0"
                    />
                    <Button variant="outline" className="hidden md:flex border-gray-300 hover:border-red-600 hover:text-red-600 uppercase tracking-wide font-bold" asChild>
                        <Link href="/products">
                            {t.home.featuredProducts.viewAll} <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No featured products yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" className="w-full border-gray-300 hover:border-red-600 hover:text-red-600 uppercase tracking-wide font-bold" asChild>
                        <Link href="/products">
                            {t.home.featuredProducts.viewAll} <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
