"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const categorySchema = z.object({
  slug: z.string().min(1),
  nameEn: z.string().min(1),
  nameId: z.string().min(1),
});

export async function createCategory(formData: FormData) {
  const data = {
    slug: formData.get("slug"),
    nameEn: formData.get("nameEn"),
    nameId: formData.get("nameId"),
  };

  const parsed = categorySchema.safeParse(data);

  if (!parsed.success) {
    console.error("Invalid data", parsed.error);
    return;
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
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
  } catch (err) {
    console.error(err);
  }
}
