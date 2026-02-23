import { PRODUCTS, CATEGORIES } from "@/lib/data/static";
import { ProductFeed } from "@/components/sections/products/product-feed";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const params = await searchParams; // Next.js 15+ await searchParams
    const categoryId = typeof params?.category === "string" ? params.category : undefined;


    let products = PRODUCTS;
    if (categoryId) {
        products = products.filter(p => p.categoryId === categoryId);
    }
    const categories = CATEGORIES;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductFeed products={products} categories={categories} />
        </Suspense>
    );
}

