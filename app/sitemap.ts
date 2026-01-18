import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://barunateknik.com";

  // Static routes
  const routes = ["", "/about", "/products", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes: Products
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  });

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9, // Products are clear priority
  }));

  // Dynamic routes: Categories
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products?category=${cat.slug}`, // Assuming category filtering
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...categoryRoutes];
}
