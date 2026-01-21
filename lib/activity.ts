/**
 * Activity logging utility
 * Logs admin actions for audit trail
 */

import { prisma } from "@/lib/prisma";
import type { ActionType, EntityType } from "@/lib/types";

/**
 * Logs an activity to the database
 *
 * @param action - The type of action performed (CREATE, UPDATE, DELETE)
 * @param entity - The entity type being modified
 * @param details - Human-readable description of the action
 */
export async function logActivity(
  action: ActionType,
  entity: EntityType | string,
  details: string,
): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        entity,
        details,
      },
    });
  } catch (error) {
    // Log error but don't throw - activity logging should not break main operations
    console.error("Failed to log activity:", error);
  }
}
