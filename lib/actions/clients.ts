"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logActivity } from "@/lib/activity";

const ClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logoUrl: z.string().min(1, "Logo URL is required"),
  website: z.string().optional(),
  isFeatured: z.boolean().default(true),
});

export async function createClient(data: z.infer<typeof ClientSchema>) {
  const result = ClientSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input" };
  }

  try {
    await prisma.client.create({
      data: result.data,
    });
    await logActivity(
      "CREATE",
      "Client",
      `Created client: ${result.data.name}`,
    );
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: "Client created" };
  } catch (error) {
    return { error: "Failed to create client" };
  }
}

export async function updateClient(
  id: string,
  data: z.infer<typeof ClientSchema>,
) {
  const result = ClientSchema.safeParse(data);

  if (!result.success) {
    return { error: "Invalid input" };
  }

  try {
    await prisma.client.update({
      where: { id },
      data: result.data,
    });
    await logActivity(
      "UPDATE",
      "Client",
      `Updated client: ${result.data.name}`,
    );
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: "Client updated" };
  } catch (error) {
    return { error: "Failed to update client" };
  }
}

export async function deleteClient(id: string) {
  try {
    await prisma.client.delete({
      where: { id },
    });
    await logActivity("DELETE", "Client", `Deleted client ID: ${id}`);
    revalidatePath("/admin/clients");
    revalidatePath("/");
    return { success: "Client deleted" };
  } catch (error) {
    return { error: "Failed to delete client" };
  }
}
