"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";

import { Prisma } from "@prisma/client";

export async function updatePageContent(
  page: string,
  section: string,
  content: Prisma.InputJsonValue,
) {
  try {
    await prisma.pageContent.upsert({
      where: {
        page_section: {
          page,
          section,
        },
      },
      update: { content },
      create: {
        page,
        section,
        content,
      },
    });

    await logActivity("UPDATE", "Content", `Updated ${page} - ${section}`);

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath(`/admin/content`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update content:", error);
    return { error: "Failed to update content" };
  }
}

export async function getPageContent(page: string, section: string) {
  const data = await prisma.pageContent.findUnique({
    where: {
      page_section: {
        page,
        section,
      },
    },
  });

  return data?.content || null;
}
