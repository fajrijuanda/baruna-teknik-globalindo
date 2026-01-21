"use server";

/**
 * Testimonial management server actions
 * Handles CRUD operations for client testimonials
 */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { REVALIDATION_PATHS } from "@/lib/constants";
import type { ActionResult, BilingualContent } from "@/lib/types";
import { successResult, handleActionError } from "@/lib/utils/action-helpers";

// ============================================================================
// Types
// ============================================================================

interface TestimonialInput {
  clientId: string;
  personName: string;
  personRole: string;
  contentEn: string;
  contentId: string;
  rating?: number;
  isVisible?: boolean;
}

interface TestimonialUpdateInput {
  clientId?: string;
  personName?: string;
  personRole?: string;
  contentEn?: string;
  contentId?: string;
  rating?: number;
  isVisible?: boolean;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Creates bilingual content object for Prisma JSON fields
 */
function createBilingualContent(en: string, id: string): BilingualContent {
  return { en, id };
}

// ============================================================================
// Read Operations
// ============================================================================

/**
 * Gets all testimonials with client details
 * @returns Array of testimonials with associated client information
 */
export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      include: {
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}

// ============================================================================
// Create Operations
// ============================================================================

/**
 * Creates a new testimonial
 * @param data - Testimonial data with bilingual content
 * @returns ActionResult indicating success or failure
 */
export async function createTestimonial(
  data: TestimonialInput,
): Promise<ActionResult> {
  try {
    await prisma.testimonial.create({
      data: {
        clientId: data.clientId,
        personName: data.personName,
        personRole: data.personRole,
        content: createBilingualContent(data.contentEn, data.contentId),
        rating: data.rating ?? 5,
        isVisible: data.isVisible ?? true,
      },
    });

    await logActivity(
      "CREATE",
      "Testimonial",
      `Added testimonial from: ${data.personName}`,
    );
    revalidatePath(REVALIDATION_PATHS.ADMIN_TESTIMONIALS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to create testimonial");
  }
}

// ============================================================================
// Update Operations
// ============================================================================

/**
 * Updates an existing testimonial
 * @param id - Testimonial ID to update
 * @param data - Testimonial data to update
 * @returns ActionResult indicating success or failure
 */
export async function updateTestimonial(
  id: string,
  data: TestimonialUpdateInput,
): Promise<ActionResult> {
  try {
    await prisma.testimonial.update({
      where: { id },
      data: {
        ...(data.clientId && { clientId: data.clientId }),
        ...(data.personName && { personName: data.personName }),
        ...(data.personRole && { personRole: data.personRole }),
        ...(data.rating !== undefined && { rating: data.rating }),
        ...(data.isVisible !== undefined && { isVisible: data.isVisible }),
        ...(data.contentEn &&
          data.contentId && {
            content: createBilingualContent(data.contentEn, data.contentId),
          }),
      },
    });

    await logActivity("UPDATE", "Testimonial", `Updated testimonial ID: ${id}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_TESTIMONIALS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to update testimonial");
  }
}

// ============================================================================
// Delete Operations
// ============================================================================

/**
 * Deletes a testimonial
 * @param id - Testimonial ID to delete
 * @returns ActionResult indicating success or failure
 */
export async function deleteTestimonial(id: string): Promise<ActionResult> {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });

    await logActivity("DELETE", "Testimonial", `Deleted testimonial ID: ${id}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_TESTIMONIALS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to delete testimonial");
  }
}
