"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandImageCarouselProps {
    images: string[];
    brandName: string;
    className?: string;
    /** Compact mode for catalog cards (smaller, no lightbox) */
    compact?: boolean;
}

export function BrandImageCarousel({
    images,
    brandName,
    className,
    compact = false,
}: BrandImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    // Auto-play every 3 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        if (isFullscreen) return; // pause autoplay in fullscreen
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [nextSlide, images.length, isFullscreen]);

    // Close fullscreen on Escape key
    useEffect(() => {
        if (!isFullscreen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsFullscreen(false);
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [isFullscreen]);

    if (images.length === 0) return null;

    return (
        <>
            <div className={cn("relative w-full", className)}>
                {/* Image Container */}
                <div
                    className={cn(
                        "relative rounded-2xl overflow-hidden",
                        compact ? "bg-slate-50 aspect-[4/5]" : "bg-white shadow-xl aspect-[3/4]",
                        !compact && "cursor-pointer"
                    )}
                    onClick={() => !compact && setIsFullscreen(true)}
                >
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
                                className="object-cover"
                                sizes={compact ? "(max-width: 768px) 100vw, 300px" : "(max-width: 768px) 100vw, 500px"}
                                priority={i === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Dot Indicators */}
                {images.length > 1 && (
                    <div className={cn("flex justify-center gap-1.5", compact ? "mt-2" : "mt-4")}>
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setCurrentIndex(i);
                                }}
                                aria-label={`Gambar ${i + 1}`}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    compact ? "w-1.5 h-1.5" : "w-2 h-2",
                                    i === currentIndex
                                        ? cn("bg-blue-500", compact ? "w-4" : "w-6")
                                        : "bg-slate-400/50 hover:bg-slate-400"
                                )}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen Lightbox */}
            {isFullscreen && !compact && typeof document !== "undefined" && createPortal(
                <div
                    className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setIsFullscreen(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        aria-label="Tutup"
                    >
                        <X className="h-6 w-6 md:h-8 md:w-8" />
                    </button>

                    {/* Fullscreen Image */}
                    <div
                        className="relative w-full h-full max-w-5xl max-h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {images.map((src, i) => (
                            <div
                                key={src}
                                className={cn(
                                    "absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center",
                                    i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                )}
                            >
                                <Image
                                    src={src}
                                    alt={`${brandName} - Produk ${i + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="90vw"
                                    priority
                                />
                            </div>
                        ))}
                    </div>

                    {/* Fullscreen Dot Indicators */}
                    {images.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(i);
                                    }}
                                    aria-label={`Gambar ${i + 1}`}
                                    className={cn(
                                        "w-3 h-3 rounded-full transition-all duration-300",
                                        i === currentIndex
                                            ? "bg-white w-8"
                                            : "bg-white/40 hover:bg-white/60"
                                    )}
                                />
                            ))}
                        </div>
                    )}

                    {/* Image counter */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 text-white/70 text-sm md:text-base font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
