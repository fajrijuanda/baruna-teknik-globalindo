import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({});
    const featured = await prisma.product.findMany({
      where: { isFeatured: true },
    });

    return NextResponse.json({
      status: "ok",
      totalProducts: products.length,
      featuredCount: featured.length,
      dbUrlStartsWith: process.env.DATABASE_URL?.substring(0, 15),
      sampleProduct: products[0],
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
