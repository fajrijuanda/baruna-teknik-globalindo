"use server";

/**
 * Page content management server actions
 * Handles dynamic content updates for public pages
 */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { REVALIDATION_PATHS } from "@/lib/constants";
import type { ActionResult } from "@/lib/types";
import { successResult, handleActionError } from "@/lib/utils/action-helpers";

import { Prisma } from "@prisma/client";

// ============================================================================
// Types
// ============================================================================

/**
 * Generic content type for page sections
 * Uses Prisma's InputJsonValue for compatibility
 */
type PageContentData = Prisma.InputJsonValue;

// ============================================================================
// Update Operations
// ============================================================================

/**
 * Updates or creates content for a specific page section
 * Uses upsert to handle both create and update cases
 *
 * @param page - The page identifier (e.g., "home", "about", "contact")
 * @param section - The section identifier within the page
 * @param content - The content data as JSON
 * @returns ActionResult indicating success or failure
 */
export async function updatePageContent(
  page: string,
  section: string,
  content: PageContentData,
): Promise<ActionResult> {
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

    await logActivity("UPDATE", "PageContent", `Updated ${page} - ${section}`);

    // Revalidate relevant paths
    revalidatePath(REVALIDATION_PATHS.HOME);
    revalidatePath(REVALIDATION_PATHS.ABOUT);
    revalidatePath(REVALIDATION_PATHS.CONTACT);
    revalidatePath(REVALIDATION_PATHS.ADMIN_CONTENT);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to update content");
  }
}

// ============================================================================
// Read Operations
// ============================================================================

/**
 * Gets content for a specific page section
 *
 * @param page - The page identifier
 * @param section - The section identifier
 * @returns The content data or null if not found
 */
export async function getPageContent(
  page: string,
  section: string,
): Promise<PageContentData | null> {
  try {
    const data = await prisma.pageContent.findUnique({
      where: {
        page_section: {
          page,
          section,
        },
      },
    });

    return (data?.content as PageContentData) || null;
  } catch (error) {
    console.error("Failed to get page content:", error);
    return null;
  }
}
