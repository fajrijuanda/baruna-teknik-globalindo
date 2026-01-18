"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function trackVisitor(path: string) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // Simple check to prevent basic spam:
    // Allow recording if no record from this IP in the last 10 minutes?
    // Or just record all hits for now as per "counter" request.
    // Let's record all hits but maybe we can query distinct later if needed.
    // User asked for "web visitors" -> usually means "Visits" or "Unique Visitors".
    // I'll record every page load for now as a "Hit".

    await prisma.visitor.create({
      data: {
        ipAddress: ip,
        userAgent: userAgent,
        path: path,
      },
    });
  } catch (error) {
    console.error("Failed to track visitor:", error);
    // Fail silently so we don't break the UI
  }
}
