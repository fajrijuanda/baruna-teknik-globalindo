"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";

import { Prisma } from "@prisma/client";

export async function getTestimonials() {
  return await prisma.testimonial.findMany({
    include: {
      client: true, // Include client details for logo and name
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createTestimonial(data: {
  clientId: string;
  personName: string;
  personRole: string;
  content: Prisma.InputJsonValue; // Json
  rating?: number;
  isVisible?: boolean;
}) {
  try {
    await prisma.testimonial.create({
      data,
    });
    await logActivity(
      "CREATE",
      "Testimonial",
      `Added testimonial from: ${data.personName}`,
    );
    revalidatePath("/admin/testimonials");
    revalidatePath("/"); // Update home page
    return { success: true };
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return { success: false, error: "Failed to create testimonial" };
  }
}

export async function updateTestimonial(
  id: string,
  data: {
    clientId?: string;
    personName?: string;
    personRole?: string;
    content?: Prisma.InputJsonValue;
    rating?: number;
    isVisible?: boolean;
  },
) {
  try {
    await prisma.testimonial.update({
      where: { id },
      data,
    });
    await logActivity("UPDATE", "Testimonial", `Updated testimonial ID: ${id}`);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return { success: false, error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });
    await logActivity("DELETE", "Testimonial", `Deleted testimonial ID: ${id}`);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete testimonial:", error);
    return { success: false, error: "Failed to delete testimonial" };
  }
}
