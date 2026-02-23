"use client";

import { ProductCard } from "@/components/shared/product-card";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeader } from "@/components/shared/section-header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

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
        <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden" >
            <div className="container mx-auto px-4 mb-12">
                <SectionHeader
                    title={t.home.featuredProducts.title}
                    subtitle={t.home.featuredProducts.subtitle}
                />
            </div>

            <div className="relative w-full overflow-hidden swiper-product-carousel-container">
                {/* Gradients for smooth fade effect at edges */}
                <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-white to-transparent dark:from-slate-950 dark:to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-white to-transparent dark:from-slate-950 dark:to-transparent pointer-events-none" />

                <div className="w-full">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={32}
                        slidesPerView="auto"
                        loop={true}
                        speed={4000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="w-full px-4"
                        grabCursor={true}
                    >
                        {/* Duplicate array slightly if products are too few to loop smoothly */}
                        {[...products, ...products, ...products].map(
                            (product, index) => (
                                <SwiperSlide key={`${product.id}-${index}`} className="!w-[280px] sm:!w-[320px]">
                                    <div className="h-full py-4">
                                        <ProductCard
                                            id={product.id}
                                            title={getString(product.title)}
                                            category={getString(product.category.name)}
                                            image={product.images[0]?.url || "https://placehold.co/600x400?text=No+Image"}
                                            slug={product.slug}
                                            description={getString(product.description)}
                                            viewSpecText={t.productsPage.viewSpec}
                                            className="h-full border border-slate-200 shadow-sm"
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                </div>
            </div>

            {/* Inject custom CSS for linear scrolling animation without easing */}
            <style jsx global>{`
                .swiper-product-carousel-container .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
            `}</style>
        </section >
    );
}
