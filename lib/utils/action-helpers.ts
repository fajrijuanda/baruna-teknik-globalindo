/**
 * Helper utilities for server actions
 * Provides consistent patterns for action results and error handling
 */

import { ActionResult } from "@/lib/types";

/**
 * Creates a successful action result
 * @param data - Optional data to include in the result
 */
export function successResult<T>(data?: T): ActionResult<T> {
  if (data !== undefined) {
    return { success: true, data };
  }
  return { success: true };
}

/**
 * Creates a failed action result
 * @param error - Error message to include
 */
export function errorResult(error: string): ActionResult<never> {
  return { success: false, error };
}

/**
 * Handles errors in server actions with consistent logging
 * @param error - The caught error
 * @param defaultMessage - Default error message to show to user
 */
export function handleActionError(
  error: unknown,
  defaultMessage: string,
): ActionResult<never> {
  console.error(defaultMessage, error);
  return errorResult(defaultMessage);
}

/**
 * Validates that required fields are present
 * @param data - The data object to validate
 * @param requiredFields - Array of required field names
 */
export function validateRequired<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[],
): string | null {
  for (const field of requiredFields) {
    const value = data[field];
    if (value === undefined || value === null || value === "") {
      return `${String(field)} is required`;
    }
  }
  return null;
}
