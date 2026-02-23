/**
 * Application constants and configuration
 */

// ============================================================================
// Site Configuration
// ============================================================================

export const SITE_CONFIG = {
  name: "PT BARUNA TEKNIK GLOBALINDO",
  description: "Specialist in Industrial Pumps, Valves, and Spareparts",
  email: "info@barunateknik.co.id",
  phone: "+62 877-8848-7287",
  address:
    "Jl. Letjen M.T. Haryono No.Kav.10, Bidara Cina, Kecamatan Jatinegara, Jakarta, Daerah Khusus Ibukota Jakarta 13330",
  googleMapsUrl: "https://maps.app.goo.gl/Nt8DtDkEQ9jce2AYA",
} as const;

export type SiteConfig = typeof SITE_CONFIG;

// ============================================================================
// Navigation Links
// ============================================================================

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
] as const;

// ============================================================================
// Product Categories (Static fallback)
// ============================================================================

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  { id: "industrial-pump", name: "Industrial Pump", slug: "industrial-pump" },
  { id: "valve", name: "Valve", slug: "valve" },
  { id: "sparepart", name: "Sparepart", slug: "sparepart" },
] as const;

// ============================================================================
// Revalidation Paths (for server actions)
// ============================================================================

export const REVALIDATION_PATHS = {
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_CLIENTS: "/admin/clients",
  ADMIN_USERS: "/admin/users",
  ADMIN_TESTIMONIALS: "/admin/testimonials",
  ADMIN_CONTENT: "/admin/content",
  HOME: "/",
  PRODUCTS: "/products",
  ABOUT: "/about",
  CONTACT: "/contact",
} as const;

export type RevalidationPath =
  (typeof REVALIDATION_PATHS)[keyof typeof REVALIDATION_PATHS];

// ============================================================================
// Validation Constants
// ============================================================================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  SLUG_PATTERN: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;
