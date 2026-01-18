"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logActivity } from "@/lib/activity";

const categorySchema = z.object({
  slug: z.string().min(1),
  nameEn: z.string().min(1),
  nameId: z.string().min(1),
});

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const parsed = categorySchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const { slug, nameEn, nameId } = parsed.data;

  try {
    await prisma.category.create({
      data: {
        slug,
        name: { en: nameEn, id: nameId },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });
    await logActivity("CREATE", "Category", `Created category: ${nameEn}`);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategory(
  id: string,
  data: z.infer<typeof categorySchema>,
) {
  const parsed = categorySchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const { slug, nameEn, nameId } = parsed.data;

  try {
    await prisma.category.update({
      where: { id },
      data: {
        slug,
        name: { en: nameEn, id: nameId },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
    });
    await logActivity("UPDATE", "Category", `Updated category: ${nameEn}`);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    await logActivity("DELETE", "Category", `Deleted category ID: ${id}`);
    revalidatePath("/admin/categories");
  } catch (err) {
    console.error(err);
  }
}
