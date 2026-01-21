"use server";

/**
 * Client management server actions
 * Handles CRUD operations for clients/partners
 */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logActivity } from "@/lib/activity";
import { REVALIDATION_PATHS } from "@/lib/constants";
import type { ActionResult } from "@/lib/types";
import {
  successResult,
  errorResult,
  handleActionError,
} from "@/lib/utils/action-helpers";

// ============================================================================
// Validation Schemas
// ============================================================================

const ClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logoUrl: z.string().min(1, "Logo URL is required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  isFeatured: z.boolean().default(true),
});

type ClientInput = z.infer<typeof ClientSchema>;

// ============================================================================
// Create Operations
// ============================================================================

/**
 * Creates a new client
 * @param data - Client data
 * @returns ActionResult indicating success or failure
 */
export async function createClient(data: ClientInput): Promise<ActionResult> {
  const result = ClientSchema.safeParse(data);

  if (!result.success) {
    return errorResult("Invalid input: " + result.error.issues[0]?.message);
  }

  try {
    await prisma.client.create({
      data: {
        name: result.data.name,
        logoUrl: result.data.logoUrl,
        website: result.data.website || null,
        isFeatured: result.data.isFeatured,
      },
    });

    await logActivity(
      "CREATE",
      "Client",
      `Created client: ${result.data.name}`,
    );
    revalidatePath(REVALIDATION_PATHS.ADMIN_CLIENTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to create client");
  }
}

// ============================================================================
// Update Operations
// ============================================================================

/**
 * Updates an existing client
 * @param id - Client ID to update
 * @param data - Client data to update
 * @returns ActionResult indicating success or failure
 */
export async function updateClient(
  id: string,
  data: ClientInput,
): Promise<ActionResult> {
  const result = ClientSchema.safeParse(data);

  if (!result.success) {
    return errorResult("Invalid input: " + result.error.issues[0]?.message);
  }

  try {
    await prisma.client.update({
      where: { id },
      data: {
        name: result.data.name,
        logoUrl: result.data.logoUrl,
        website: result.data.website || null,
        isFeatured: result.data.isFeatured,
      },
    });

    await logActivity(
      "UPDATE",
      "Client",
      `Updated client: ${result.data.name}`,
    );
    revalidatePath(REVALIDATION_PATHS.ADMIN_CLIENTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to update client");
  }
}

// ============================================================================
// Delete Operations
// ============================================================================

/**
 * Deletes a client
 * @param id - Client ID to delete
 * @returns ActionResult indicating success or failure
 */
export async function deleteClient(id: string): Promise<ActionResult> {
  try {
    await prisma.client.delete({
      where: { id },
    });

    await logActivity("DELETE", "Client", `Deleted client ID: ${id}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_CLIENTS);
    revalidatePath(REVALIDATION_PATHS.HOME);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to delete client");
  }
}
