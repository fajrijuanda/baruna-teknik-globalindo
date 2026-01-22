import { Hero } from "@/components/sections/home/hero";
import { prisma } from "@/lib/prisma";
import { getPageContent } from "@/lib/actions/content";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/home/about").then(mod => mod.About));
const Features = dynamic(() => import("@/components/sections/home/features").then(mod => mod.Features));
const ProductCarousel = dynamic(() => import("@/components/sections/home/product-carousel").then(mod => mod.ProductCarousel));
const Clients = dynamic(() => import("@/components/sections/home/clients").then(mod => mod.Clients));
const Testimonials = dynamic(() => import("@/components/sections/home/testimonials").then(mod => mod.Testimonials));

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
