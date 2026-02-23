import { BrandCatalog } from "@/components/sections/products/brand-catalog";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrandCatalog />
        </Suspense>
    );
}


