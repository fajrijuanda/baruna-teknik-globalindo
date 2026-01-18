import { prisma } from "@/lib/prisma";

export async function logActivity(
  action: string,
  entity: string,
  details: string,
) {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        entity,
        details,
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
