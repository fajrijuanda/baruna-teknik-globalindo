"use client";

import { ProductCard } from "@/components/shared/product-card";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeader } from "@/components/shared/section-header";

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

interface ProductCarouselProps {
    products: Product[];
}

export function ProductCarousel({ products = [] }: ProductCarouselProps) {
    const { t, language } = useLanguage();

    const getString = (json: unknown): string => {
        if (!json || typeof json !== 'object') return "";
        const bilingual = json as BilingualString;
        return bilingual[language] || bilingual['en'] || "";
    };

    if (!products.length) return null;

    return (
        <section className="py-24 bg-white dark:bg-black overflow-hidden" >
            <div className="container mx-auto px-4 mb-12">
                <SectionHeader
                    title={t.home.featuredProducts.title}
                    subtitle={t.home.featuredProducts.subtitle}
                />
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradients for smooth fade effect at edges */}
                <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950/50 dark:to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950/50 dark:to-transparent pointer-events-none" />

                <div className="flex w-max animate-scroll hover:pause gap-8 pl-4">
                    {/* Duplicate array for seamless scroll loop */}
                    {[...products, ...products].map(
                        (product, index) => (
                            <div key={`${product.id}-${index}`} className="w-[300px] flex-shrink-0">
                                <ProductCard
                                    id={product.id}
                                    title={getString(product.title)}
                                    category={getString(product.category.name)}
                                    image={product.images[0]?.url || "https://placehold.co/600x400?text=No+Image"}
                                    slug={product.slug}
                                    description={getString(product.description)}
                                    viewSpecText={t.productsPage.viewSpec}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </section >
    );
}
