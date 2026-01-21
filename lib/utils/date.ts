/**
 * Date formatting utilities
 */

/**
 * Formats a date to a short human-readable format
 * Example: "Jan 21, 10:30 AM"
 */
export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Formats a date to a long human-readable format
 * Example: "January 21, 2026"
 */
export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Formats a date to ISO date string (YYYY-MM-DD)
 */
export function formatISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}
