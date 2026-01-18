"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function WAFloating() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return null;

    // Remove non-numeric characters for the API link
    const phoneNumber = SITE_CONFIG.phone.replace(/\D/g, "");
    const waUrl = `https://wa.me/${phoneNumber}?text=Halo%20Baruna%20Teknik,%20saya%20ingin%20bertanya%20tentang%20produk%20Anda.`;

    return (
        <Link
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-transform hover:scale-110 hover:bg-blue-700 animate-in fade-in slide-in-from-bottom-4 duration-1000 md:bottom-6"
            aria-label="Chat via WhatsApp"
        >
            <MessageCircle className="h-8 w-8 text-white" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
        </Link>
    );
}
