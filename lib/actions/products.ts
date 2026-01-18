"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logActivity } from "@/lib/activity";

const productSchema = z.object({
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  titleEn: z.string().min(1),
  titleId: z.string().min(1),
  descEn: z.string().min(1),
  descId: z.string().min(1),
});

export async function createProduct(
  data: z.infer<typeof productSchema> & { imageUrl?: string },
) {
  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const { slug, categoryId, titleEn, titleId, descEn, descId } = parsed.data;
  const imageUrl = data.imageUrl;

  try {
    await prisma.product.create({
      data: {
        slug,
        categoryId,
        title: { en: titleEn, id: titleId },
        description: { en: descEn, id: descId },
        images: imageUrl
          ? {
              create: { url: imageUrl },
            }
          : undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });

    await logActivity("CREATE", "Product", `Created product: ${titleEn}`);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(
  id: string,
  data: z.infer<typeof productSchema> & { imageUrl?: string },
) {
  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const { slug, categoryId, titleEn, titleId, descEn, descId } = parsed.data;
  const imageUrl = data.imageUrl;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        slug,
        categoryId,
        title: { en: titleEn, id: titleId },
        description: { en: descEn, id: descId },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });

    if (imageUrl) {
      const existing = await prisma.image.findFirst({
        where: { productId: id },
      });
      if (existing) {
        await prisma.image.update({
          where: { id: existing.id },
          data: { url: imageUrl },
        });
      } else {
        await prisma.image.create({
          data: { url: imageUrl, productId: id },
        });
      }
    }

    await logActivity("UPDATE", "Product", `Updated product: ${titleEn}`);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    await logActivity("DELETE", "Product", `Deleted product ID: ${id}`);
    revalidatePath("/admin/products");
  } catch (err) {
    console.error(err);
  }
}

export async function getCategoryOptions() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });
  return categories.map((c) => ({
    id: c.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: (c.name as any)?.en + " / " + (c.name as any)?.id,
  }));
}
