"use server";

/**
 * User/Admin management server actions
 * Handles CRUD operations for admin users
 */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { logActivity } from "@/lib/activity";
import { REVALIDATION_PATHS, VALIDATION } from "@/lib/constants";
import type { ActionResult, AdminData, AdminRole } from "@/lib/types";
import {
  successResult,
  errorResult,
  handleActionError,
} from "@/lib/utils/action-helpers";

// ============================================================================
// Validation Schemas
// ============================================================================

const AdminSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(
      VALIDATION.PASSWORD_MIN_LENGTH,
      "Password must be at least 6 characters",
    ),
  role: z.enum(["superadmin", "admin"]).default("admin"),
});

const UpdateAdminSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email").optional(),
  password: z
    .string()
    .min(
      VALIDATION.PASSWORD_MIN_LENGTH,
      "Password must be at least 6 characters",
    )
    .optional()
    .or(z.literal("")),
  role: z.enum(["superadmin", "admin"]).optional(),
});

// ============================================================================
// Read Operations
// ============================================================================

/**
 * Fetches all admin users
 * @returns ActionResult with array of admin data
 */
export async function getAdmins(): Promise<ActionResult<AdminData[]>> {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResult(admins);
  } catch (error) {
    return handleActionError(error, "Failed to fetch admins");
  }
}

// ============================================================================
// Create Operations
// ============================================================================

/**
 * Creates a new admin user
 * @param data - Admin user data
 * @returns ActionResult indicating success or failure
 */
export async function createAdmin(
  data: z.infer<typeof AdminSchema>,
): Promise<ActionResult> {
  const result = AdminSchema.safeParse(data);

  if (!result.success) {
    return errorResult("Invalid input: " + result.error.issues[0]?.message);
  }

  const { email, password, name, role } = result.data;

  try {
    // Check for existing email
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return errorResult("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await prisma.admin.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });

    await logActivity(
      "CREATE",
      "Admin",
      `Created new admin: ${email} (${role})`,
    );
    revalidatePath(REVALIDATION_PATHS.ADMIN_USERS);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to create admin");
  }
}

// ============================================================================
// Update Operations
// ============================================================================

/**
 * Updates an existing admin user
 * @param id - Admin user ID
 * @param data - Partial admin data to update
 * @returns ActionResult indicating success or failure
 */
export async function updateAdmin(
  id: string,
  data: z.infer<typeof UpdateAdminSchema>,
): Promise<ActionResult> {
  const result = UpdateAdminSchema.safeParse(data);

  if (!result.success) {
    return errorResult("Invalid input: " + result.error.issues[0]?.message);
  }

  try {
    const { name, email, role, password } = result.data;

    // Build update data object
    const dataToUpdate: {
      name?: string;
      email?: string;
      role?: AdminRole;
      password?: string;
    } = {};

    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (role) dataToUpdate.role = role;

    // Only update password if provided and meets minimum length
    if (password && password.length >= VALIDATION.PASSWORD_MIN_LENGTH) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    await prisma.admin.update({
      where: { id },
      data: dataToUpdate,
    });

    await logActivity("UPDATE", "Admin", `Updated admin: ${email || id}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_USERS);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to update admin");
  }
}

// ============================================================================
// Delete Operations
// ============================================================================

/**
 * Deletes an admin user
 * @param id - Admin user ID to delete
 * @returns ActionResult indicating success or failure
 */
export async function deleteAdmin(id: string): Promise<ActionResult> {
  try {
    await prisma.admin.delete({
      where: { id },
    });

    await logActivity("DELETE", "Admin", `Deleted admin ID: ${id}`);
    revalidatePath(REVALIDATION_PATHS.ADMIN_USERS);

    return successResult();
  } catch (error) {
    return handleActionError(error, "Failed to delete admin");
  }
}
