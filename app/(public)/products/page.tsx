import { prisma } from "@/lib/prisma";
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


    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (categoryId) {
        where.categoryId = categoryId;
    }
    // Search logic is tricky with JSON fields in Prisma without raw queries,
    // but we can try simple filtering or skip for now if too complex.
    // For now, let's just filter by category.
    // Implementing text search on JSON requires database specific syntax or Prisma Full Text Search (Preview).
    // Given the constraints, we might skip deep text search on JSON for this step or do in-memory (bad for scale).
    // Let's stick to Category filter first.

    const [products, categories] = await Promise.all([
        prisma.product.findMany({
            where,
            include: {
                category: true,
                images: true,
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma.category.findMany(),
    ]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductFeed products={products} categories={categories} />
        </Suspense>
    );
}

