"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

interface HeaderBrandImageProps {
    src: string;
    brandName: string;
}

export function HeaderBrandImage({ src, brandName }: HeaderBrandImageProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

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

    return (
        <>
            <div
                className="relative w-[360px] h-[220px] lg:w-[460px] lg:h-[280px] rounded-2xl overflow-hidden shadow-2xl bg-white cursor-pointer group"
                onClick={() => setIsFullscreen(true)}
            >
                <Image
                    src={src}
                    alt={`${brandName} product`}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    priority
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-2xl" />
            </div>

            {/* Fullscreen Lightbox */}
            {isFullscreen && typeof document !== "undefined" && createPortal(
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
                        <Image
                            src={src}
                            alt={`${brandName} product`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
