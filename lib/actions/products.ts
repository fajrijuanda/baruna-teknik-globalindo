"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  titleEn: z.string().min(1),
  titleId: z.string().min(1),
  descEn: z.string().min(1),
  descId: z.string().min(1),
});

export async function createProduct(formData: FormData) {
  const data = {
    slug: formData.get("slug"),
    categoryId: formData.get("categoryId"),
    titleEn: formData.get("titleEn"),
    titleId: formData.get("titleId"),
    descEn: formData.get("descEn"),
    descId: formData.get("descId"),
  };

  const parsed = productSchema.safeParse(data);

  if (!parsed.success) {
    console.error("Invalid data", parsed.error);
    return;
  }

  const { slug, categoryId, titleEn, titleId, descEn, descId } = parsed.data;
  const imageUrl = formData.get("imageUrl") as string;

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
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
  } catch (err) {
    console.error(err);
  }
}
