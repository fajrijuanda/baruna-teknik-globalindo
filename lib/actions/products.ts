"use server";

/**
 * Product management server actions
 * Handles CRUD operations for products
 */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logActivity } from "@/lib/activity";
import { REVALIDATION_PATHS } from "@/lib/constants";
import type {
  ActionResult,
  BilingualContent,
  CategoryOption,
} from "@/lib/types";
import {
  successResult,
  errorResult,
  handleActionError,
} from "@/lib/utils/action-helpers";

// ============================================================================
// Validation Schemas
// ============================================================================

const ProductSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleId: z.string().min(1, "Indonesian title is required"),
  descEn: z.string().min(1, "English description is required"),
  descId: z.string().min(1, "Indonesian description is required"),
  imageUrl: z.string().optional(),
});

type ProductInput = z.infer<typeof ProductSchema>;

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
 * Creates a new product
 * @param data - Product data including bilingual title and description
 * @returns ActionResult indicating success or failure
 */
export async function createProduct(data: ProductInput): Promise<ActionResult> {
  const parsed = ProductSchema.safeParse(data);

  if (!parsed.success) {
    return errorResult("Invalid data: " + parsed.error.issues[0]?.message);
  }

  const { slug, categoryId, titleEn, titleId, descEn, descId, imageUrl } =
    parsed.data;

  try {
    await prisma.product.create({
      data: {
        slug,
        categoryId,
        title: createBilingualContent(titleEn, titleId),
        description: createBilingualContent(descEn, descId),
        images: imageUrl
          ? {
              create: { url: imageUrl },
            }
          : undefined,
      },
    });

    await logActivity("CREATE", "Product", `Created product: ${titleEn}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    if ((error as any).code === "P2002") {
      return errorResult("Product with this slug already exists.");
    }
    return handleActionError(error, "Failed to create product");
  }
}

export async function createProductAction(formData: FormData): Promise<void> {
  const data = {
    slug: formData.get("slug") as string,
    categoryId: formData.get("categoryId") as string,
    titleEn: formData.get("titleEn") as string,
    titleId: formData.get("titleId") as string,
    descEn: formData.get("descEn") as string,
    descId: formData.get("descId") as string,
    imageUrl: (formData.get("imageUrl") as string) || undefined,
  };

  const result = await createProduct(data);
  if (!result.success) {
    throw new Error(result.error);
  }
}

// ============================================================================
// Update Operations
// ============================================================================

/**
 * Updates an existing product
 * @param id - Product ID to update
 * @param data - Product data to update
 * @returns ActionResult indicating success or failure
 */
export async function updateProduct(
  id: string,
  data: ProductInput,
): Promise<ActionResult> {
  const parsed = ProductSchema.safeParse(data);

  if (!parsed.success) {
    return errorResult("Invalid data: " + parsed.error.issues[0]?.message);
  }

  const { slug, categoryId, titleEn, titleId, descEn, descId, imageUrl } =
    parsed.data;

  try {
    // Update product
    await prisma.product.update({
      where: { id },
      data: {
        slug,
        categoryId,
        title: createBilingualContent(titleEn, titleId),
        description: createBilingualContent(descEn, descId),
      },
    });

    // Handle image update
    if (imageUrl) {
      const existingImage = await prisma.image.findFirst({
        where: { productId: id },
      });

      if (existingImage) {
        await prisma.image.update({
          where: { id: existingImage.id },
          data: { url: imageUrl },
        });
      } else {
        await prisma.image.create({
          data: { url: imageUrl, productId: id },
        });
      }
    }

    await logActivity("UPDATE", "Product", `Updated product: ${titleEn}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to update product");
  }
}

// ============================================================================
// Delete Operations
// ============================================================================

/**
 * Deletes a product
 * @param id - Product ID to delete
 * @returns ActionResult indicating success or failure
 */
export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    await prisma.product.delete({ where: { id } });

    await logActivity("DELETE", "Product", `Deleted product ID: ${id}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.PRODUCTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to delete product");
  }
}

// ============================================================================
// Read Operations
// ============================================================================

/**
 * Gets category options for product form dropdowns
 * @returns Array of category options with combined bilingual names
 */
export async function getCategoryOptions(): Promise<CategoryOption[]> {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });

    return categories.map((category) => {
      const name = category.name as BilingualContent | null;
      return {
        id: category.id,
        name: name ? `${name.en} / ${name.id}` : "Unknown",
      };
    });
  } catch (error) {
    console.error("Failed to fetch category options:", error);
    return [];
  }
}
