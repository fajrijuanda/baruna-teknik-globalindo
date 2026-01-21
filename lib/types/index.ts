/**
 * Shared TypeScript types for the application
 * Centralized type definitions for consistent typing across the codebase
 */

// ============================================================================
// Action Result Types
// ============================================================================

/**
 * Standard result type for all server actions
 * Ensures consistent return format across the application
 */
export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

// ============================================================================
// Bilingual Content Types (for Prisma JSON fields)
// ============================================================================

/**
 * Represents content that supports both Indonesian and English
 * Used for Product titles, descriptions, Category names, etc.
 * Index signature added for Prisma JSON compatibility
 */
export interface BilingualContent {
  [key: string]: string;
  en: string;
  id: string;
}

// ============================================================================
// Entity & Action Types
// ============================================================================

/**
 * Types of entities in the system (for activity logging)
 */
export type EntityType =
  | "Product"
  | "Category"
  | "Client"
  | "Testimonial"
  | "Admin"
  | "PageContent";

/**
 * Types of actions that can be performed (for activity logging)
 */
export type ActionType = "CREATE" | "UPDATE" | "DELETE";

/**
 * User roles in the admin system
 */
export type AdminRole = "superadmin" | "admin";

// ============================================================================
// Admin Types
// ============================================================================

export interface AdminData {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date;
}

export interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
  role?: AdminRole;
}

export interface UpdateAdminInput {
  name?: string;
  email?: string;
  password?: string;
  role?: AdminRole;
}

// ============================================================================
// Product Types
// ============================================================================

export interface ProductInput {
  slug: string;
  categoryId: string;
  titleEn: string;
  titleId: string;
  descEn: string;
  descId: string;
  imageUrl?: string;
}

// ============================================================================
// Category Types
// ============================================================================

export interface CategoryInput {
  slug: string;
  nameEn: string;
  nameId: string;
}

export interface CategoryOption {
  id: string;
  name: string;
}

// ============================================================================
// Client Types
// ============================================================================

export interface ClientInput {
  name: string;
  logoUrl: string;
  website?: string;
  isFeatured?: boolean;
}

// ============================================================================
// Testimonial Types
// ============================================================================

export interface TestimonialInput {
  clientId: string;
  personName: string;
  personRole: string;
  contentEn: string;
  contentId: string;
  rating?: number;
  isVisible?: boolean;
}

// ============================================================================
// Activity Log Types
// ============================================================================

export interface ActivityLogEntry {
  id: string;
  action: ActionType;
  entity: EntityType;
  details: string;
  createdAt: Date;
}

// ============================================================================
// Contact Content Types
// ============================================================================

export interface ContactContent {
  address?: string;
  phone?: string;
  email?: string;
  googleMapsUrl?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}
