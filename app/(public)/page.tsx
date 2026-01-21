import { Hero } from "@/components/sections/home/hero";
import { About } from "@/components/sections/home/about";
import { Features } from "@/components/sections/home/features";
import { ProductCarousel } from "@/components/sections/home/product-carousel";
import { prisma } from "@/lib/prisma";

import { Clients } from "@/components/sections/home/clients";
import { Testimonials } from "@/components/sections/home/testimonials";
import { getPageContent } from "@/lib/actions/content";

export const revalidate = 60;

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

    const homeHeroContent = await getPageContent("home", "hero");
    const homeAboutContent = await getPageContent("home", "about");
    const homeFeaturesContent = await getPageContent("home", "features");
    const homeTestimonialsContent = await getPageContent("home", "testimonials");

    const testimonials = await prisma.testimonial.findMany({
        where: { isVisible: true },
        include: { client: true },
        orderBy: { createdAt: "desc" },
        take: 3
    });

    const clients = await prisma.client.findMany({
        where: { isFeatured: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <>
            <Hero
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                titleEn={(homeHeroContent as any)?.titleEn}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                titleId={(homeHeroContent as any)?.titleId}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                subtitleEn={(homeHeroContent as any)?.subtitleEn}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                subtitleId={(homeHeroContent as any)?.subtitleId}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                heroImage={(homeHeroContent as any)?.heroImage}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <About content={homeAboutContent as any} />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Features content={homeFeaturesContent as any} />
            <ProductCarousel products={featuredProducts} />
            <Clients clients={clients} />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Testimonials content={homeTestimonialsContent as any} testimonials={testimonials} />
        </>
    );
}
