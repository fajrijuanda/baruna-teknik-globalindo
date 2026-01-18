"use server";

import { prisma } from "@/lib/prisma";
import {
  startOfDay,
  endOfDay,
  subDays,
  eachDayOfInterval,
  format,
} from "date-fns";

export interface DailyVisitorStat {
  date: string; // formatted "MMM dd"
  fullDate: string; // "yyyy-MM-dd"
  total: number;
}

export async function getVisitorStats(
  from?: Date,
  to?: Date,
): Promise<DailyVisitorStat[]> {
  // Default to last 7 days if not provided
  const endDate = to || endOfDay(new Date());
  const startDate = from || subDays(endDate, 6); // 7 days inclusive

  const visitors = await prisma.visitor.findMany({
    where: {
      createdAt: {
        gte: startOfDay(startDate),
        lte: endOfDay(endDate),
      },
    },
    select: {
      createdAt: true,
    },
  });

  // Generate all days in interval to ensure 0-filled days
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const stats = days.map((day) => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);

    const count = visitors.filter(
      (v) => v.createdAt >= dayStart && v.createdAt <= dayEnd,
    ).length;

    return {
      date: format(day, "MMM dd"),
      fullDate: format(day, "yyyy-MM-dd"),
      total: count,
    };
  });

  return stats;
}
