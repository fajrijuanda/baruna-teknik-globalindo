"use server";

/**
 * Category management server actions
 * Handles CRUD operations for product categories
 */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logActivity } from "@/lib/activity";
import { REVALIDATION_PATHS } from "@/lib/constants";
import type { ActionResult, BilingualContent } from "@/lib/types";
import {
  successResult,
  errorResult,
  handleActionError,
} from "@/lib/utils/action-helpers";

// ============================================================================
// Validation Schemas
// ============================================================================

const CategorySchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  nameEn: z.string().min(1, "English name is required"),
  nameId: z.string().min(1, "Indonesian name is required"),
});

type CategoryInput = z.infer<typeof CategorySchema>;

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
// Create Operations
// ============================================================================

/**
 * Creates a new category
 * @param data - Category data including bilingual name
 * @returns ActionResult indicating success or failure
 */
export async function createCategory(
  data: CategoryInput,
): Promise<ActionResult> {
  const parsed = CategorySchema.safeParse(data);

  if (!parsed.success) {
    return errorResult("Invalid data: " + parsed.error.issues[0]?.message);
  }

  const { slug, nameEn, nameId } = parsed.data;

  try {
    await prisma.category.create({
      data: {
        slug,
        name: createBilingualContent(nameEn, nameId),
      },
    });

    await logActivity("CREATE", "Category", `Created category: ${nameEn}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_CATEGORIES);
    revalidatePath(REVALIDATION_PATHS.PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to create category");
  }
}

// ============================================================================
// Update Operations
// ============================================================================

/**
 * Updates an existing category
 * @param id - Category ID to update
 * @param data - Category data to update
 * @returns ActionResult indicating success or failure
 */
export async function updateCategory(
  id: string,
  data: CategoryInput,
): Promise<ActionResult> {
  const parsed = CategorySchema.safeParse(data);

  if (!parsed.success) {
    return errorResult("Invalid data: " + parsed.error.issues[0]?.message);
  }

  const { slug, nameEn, nameId } = parsed.data;

  try {
    await prisma.category.update({
      where: { id },
      data: {
        slug,
        name: createBilingualContent(nameEn, nameId),
      },
    });

    await logActivity("UPDATE", "Category", `Updated category: ${nameEn}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_CATEGORIES);
    revalidatePath(REVALIDATION_PATHS.PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to update category");
  }
}

// ============================================================================
// Delete Operations
// ============================================================================

/**
 * Deletes a category
 * @param id - Category ID to delete
 * @returns ActionResult indicating success or failure
 */
export async function deleteCategory(id: string): Promise<ActionResult> {
  try {
    await prisma.category.delete({ where: { id } });

    await logActivity("DELETE", "Category", `Deleted category ID: ${id}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_CATEGORIES);
    revalidatePath(REVALIDATION_PATHS.PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to delete category");
  }
}
