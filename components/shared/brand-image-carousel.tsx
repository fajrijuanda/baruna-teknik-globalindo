"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandImageCarouselProps {
    images: string[];
    brandName: string;
    className?: string;
}

export function BrandImageCarousel({
    images,
    brandName,
    className,
}: BrandImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    // Auto-play every 3 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [nextSlide, images.length]);

    if (images.length === 0) return null;

    return (
        <div className={cn("relative w-full", className)}>
            {/* Image Container */}
            <div className="aspect-[4/3] relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {images.map((src, i) => (
                    <div
                        key={src}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-700 ease-in-out",
                            i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        )}
                    >
                        <Image
                            src={src}
                            alt={`${brandName} - Produk ${i + 1}`}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 768px) 100vw, 350px"
                            priority={i === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Dot Indicators */}
            {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Gambar ${i + 1}`}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                i === currentIndex
                                    ? "bg-blue-500 w-6"
                                    : "bg-slate-400/50 hover:bg-slate-400"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
