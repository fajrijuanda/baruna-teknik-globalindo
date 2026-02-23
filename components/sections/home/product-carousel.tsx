"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeader } from "@/components/shared/section-header";
import { PRODUCT_BRANDS_MENU } from "@/lib/constants";
import { CLIENTS } from "@/lib/data/static";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

// Badge color mapping per category slug
const CATEGORY_BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    "electric-motors": {
        bg: "bg-blue-50 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
    },
    "pompa": {
        bg: "bg-emerald-50 dark:bg-emerald-900/30",
        text: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200 dark:border-emerald-800",
    },
    "sparepart": {
        bg: "bg-amber-50 dark:bg-amber-900/30",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
    },
    "general": {
        bg: "bg-purple-50 dark:bg-purple-900/30",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
    },
};

function getCategoryBadgeClasses(slug: string) {
    return CATEGORY_BADGE_COLORS[slug] || CATEGORY_BADGE_COLORS["general"];
}

export { CATEGORY_BADGE_COLORS, getCategoryBadgeClasses };

export function ProductCarousel() {
    const { t } = useLanguage();

    // Flatten all brands from all categories
    const allBrands = PRODUCT_BRANDS_MENU.flatMap(cat =>
        cat.brands.map(brand => ({
            ...brand,
            category: cat.category,
            categorySlug: cat.slug,
        }))
    );

    if (!allBrands.length) return null;

    // Triple to ensure enough slides for seamless looping
    const slideBrands = [...allBrands, ...allBrands, ...allBrands];

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
                        spaceBetween={24}
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
                        {slideBrands.map((brand, index) => {
                            const clientData = CLIENTS.find(
                                c => c.name.toLowerCase() === brand.name.toLowerCase()
                            );
                            const logoUrl = clientData?.logoUrl || "/images/placeholder.jpg";
                            const badgeColors = getCategoryBadgeClasses(brand.categorySlug);

                            return (
                                <SwiperSlide key={`${brand.slug}-${index}`} className="!w-[260px] sm:!w-[300px]">
                                    <div className="h-full py-4">
                                        <Link
                                            href={`/brands/${brand.categorySlug}/${brand.slug}`}
                                            className="group block h-full"
                                        >
                                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group-hover:-translate-y-1 group-hover:border-blue-200 dark:group-hover:border-blue-900/50">
                                                {/* Logo Area */}
                                                <div className="w-full aspect-[4/3] relative bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-6">
                                                    {/* Category Badge */}
                                                    <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeColors.bg} ${badgeColors.text} ${badgeColors.border}`}>
                                                        {brand.category}
                                                    </span>
                                                    <Image
                                                        src={logoUrl}
                                                        alt={brand.name}
                                                        fill
                                                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 260px, 300px"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 flex flex-col flex-grow">
                                                    <h3 className="font-bold text-lg font-oswald text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                                        {brand.name}
                                                    </h3>
                                                    {brand.description && (
                                                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                                            {brand.description}
                                                        </p>
                                                    )}
                                                    <p className="mt-auto text-sm font-bold text-blue-600 uppercase tracking-wider group-hover:gap-2 transition-all flex items-center gap-1">
                                                        Lihat Detail →
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
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
