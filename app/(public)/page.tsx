import { Hero } from "@/components/sections/home/hero";
import { PAGE_CONTENT, CLIENTS } from "@/lib/data/static";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/home/about").then(mod => mod.About));
const Features = dynamic(() => import("@/components/sections/home/features").then(mod => mod.Features));
const ProductCarousel = dynamic(() => import("@/components/sections/home/product-carousel").then(mod => mod.ProductCarousel));
const Clients = dynamic(() => import("@/components/sections/home/clients").then(mod => mod.Clients));


export const revalidate = 60;

export default function HomePage() {


    const homeHeroContent = PAGE_CONTENT.home.hero;
    const homeAboutContent = PAGE_CONTENT.home.about;



    const clients = CLIENTS.filter(c => c.isFeatured);

    return (
        <>
            <Hero
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                titleId={(homeHeroContent as any)?.titleId}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                subtitleId={(homeHeroContent as any)?.subtitleId}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                heroImage={(homeHeroContent as any)?.heroImage}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <About content={homeAboutContent as any} />
            <Features />
            <ProductCarousel />
            <Clients clients={clients} />

        </>
    );
}
