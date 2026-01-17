import { Hero } from "@/components/sections/home/hero";
import { About } from "@/components/sections/home/about";
import { Features } from "@/components/sections/home/features";
import { ProductCarousel } from "@/components/sections/home/product-carousel";
import { prisma } from "@/lib/prisma";

import { Clients } from "@/components/sections/home/clients";
import { Testimonials } from "@/components/sections/home/testimonials";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        include: {
            category: true,
            images: true,
        },
        take: 6,
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <Hero />
            <About />
            <Features />
            <ProductCarousel products={featuredProducts} />
            <Clients />
            <Testimonials />
        </>
    );
}
