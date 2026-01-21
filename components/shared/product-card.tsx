"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    id: string;
    title: string;
    category: string;
    image: string;
    slug: string;
    className?: string;
    description?: string;
    viewSpecText?: string;
}

export function ProductCard({
    title,
    category,
    image,
    slug,
    className,
    description,
    viewSpecText = "Lihat Spesifikasi",
}: ProductCardProps) {
    return (
        <div
            className={cn(
                "group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full",
                className
            )}
        >
            {/* Image Container */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                <Badge className="absolute top-3 left-3 z-10 bg-navy-900/90 text-white hover:bg-navy-800 border-none font-medium px-3 py-1 uppercase tracking-wider text-[10px]">
                    {category}
                </Badge>
                {/* Placeholder for Next/Image - using div for now until we have real images */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/products/${slug}`}>
                        <span className="absolute inset-0" />
                        {title}
                    </Link>
                </h3>
                {description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                )}
                <div className="mt-auto">
                    <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 font-bold uppercase tracking-wider text-xs gap-1 group-hover:gap-2 transition-all"
                    >
                        {viewSpecText} <ArrowRight className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
