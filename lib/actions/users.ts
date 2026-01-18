"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { logActivity } from "@/lib/activity";

const AdminSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().default("admin"),
});

export async function getAdmins() {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: admins };
  } catch {
    return { success: false, error: "Failed to fetch admins" };
  }
}

export async function createAdmin(data: z.infer<typeof AdminSchema>) {
  const result = AdminSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Invalid input" };
  }

  const { email, password, name, role } = result.data;

  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return { success: false, error: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Create admin error:", error);
    return { success: false, error: "Failed to create admin" };
  }
}

export async function updateAdmin(
  id: string,
  data: Partial<z.infer<typeof AdminSchema>>,
) {
  try {
    const { name, email, role, password } = data;

    const dataToUpdate: Record<string, string | undefined | null> = {
      name,
      email,
      role,
    };
    if (password && password.length >= 6) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    await prisma.admin.update({
      where: { id },
      data: dataToUpdate,
    });

    await logActivity("UPDATE", "Admin", `Updated admin: ${email}`);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update admin" };
  }
}

export async function deleteAdmin(id: string) {
  try {
    // Prevent deleting the last superadmin (optional safety check, but good practice)
    // For now, just logging.

    await prisma.admin.delete({
      where: { id },
    });

    await logActivity("DELETE", "Admin", `Deleted admin ID: ${id}`);
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete admin" };
  }
}
