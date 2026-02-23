/**
 * Application constants and configuration
 */

// ============================================================================
// Site Configuration
// ============================================================================

export const SITE_CONFIG = {
  name: "PT BARUNA TEKNIK GLOBALINDO",
  description: "Specialist in Industrial Pumps, Valves, and Spareparts",
  email: "admin@barunateknikglobalindo.com",
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
// Product Brands Menu (Nested Dropdown)
// ============================================================================

export interface BrandMenuLink {
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryMenuLink {
  category: string;
  slug: string;
  brands: BrandMenuLink[];
}

export const PRODUCT_BRANDS_MENU: readonly CategoryMenuLink[] = [
  {
    category: "Electric Motors",
    slug: "electric-motors",
    brands: [
      {
        name: "TECO",
        slug: "teco",
        description:
          "Produsen motor listrik global terkemuka dari Taiwan, terkenal dengan efisiensi tinggi dan keandalannya di berbagai industri berat.",
      },
      {
        name: "WEG",
        slug: "weg",
        description:
          "Produsen peralatan listrik multinasional asal Brasil yang menawarkan solusi motor listrik dengan performa ekstrem dan hemat energi.",
      },
      {
        name: "Brook Crompton",
        slug: "brook-crompton",
        description:
          "Produsen motor listrik pionir asal Inggris dengan pengalaman lebih dari seabad, menghadirkan efisiensi energi terdepan dan jaminan ketahanan tangguh untuk berbagai kebutuhan komersial dan industri berat.",
      },
      {
        name: "Titan",
        slug: "titan",
        description:
          "Motor listrik andal yang dirancang untuk kebutuhan industri standar dengan keseimbangan sempurna antara harga dan performa.",
      },
      {
        name: "Yuema",
        slug: "yuema",
        description:
          "Solusi motor listrik ekonomis dan efisien untuk keperluan standar industri dengan daya tahan operasional harian yang baik.",
      },
      {
        name: "CMP",
        slug: "cmp",
        description:
          "Menyediakan lini motor premium yang fokus pada daya tahan tinggi dan desain kokoh untuk lingkungan kerja ekstrem.",
      },
      {
        name: "Elektrim",
        slug: "elektrim",
        description:
          "Motor listrik tangguh buatan Eropa dengan reputasi legendaris untuk keandalan jangka panjang dan efisiensi IE tinggi.",
      },
    ],
  },
  {
    category: "Sparepart",
    slug: "sparepart",
    brands: [
      {
        name: "Maktec",
        slug: "maktec",
        description:
          "Suku cadang dan peralatan daya listrik berkualitas yang terkenal awet untuk keperluan bengkel dan konstruksi.",
      },
    ],
  },
  {
    category: "Pompa",
    slug: "pompa",
    brands: [
      {
        name: "CNP",
        slug: "cnp",
        description:
          "Spesialis pompa sentrifugal asal Tiongkok dengan material baja tahan karat bermutu tinggi untuk kebutuhan domestik dan industri water treatment.",
      },
      {
        name: "Ebara",
        slug: "ebara",
        description:
          "Produsen pompa air terkemuka dari Jepang yang menawarkan keandalan tinggi untuk hidraulik, drainase, dan sirkulasi fluida industri.",
      },
      {
        name: "Flugo",
        slug: "flugo",
        description:
          "Merek pompa industri yang menawarkan desain inovatif untuk optimasi aliran cairan dalam volume besar atau bertekanan tinggi.",
      },
      {
        name: "KSB",
        slug: "ksb",
        description:
          "Ahli pompa air dan katup asal Jerman yang mengutamakan teknologi canggih untuk keamanan dan efisiensi penanganan cairan.",
      },
      {
        name: "Emec",
        slug: "emec",
        description:
          "Merek terpercaya asal Italia yang berspesialisasi dalam sistem pompa dosis (dosing pump) mutakhir dan instrumen kontrol kimia dengan presisi dan keamanan tingkat tinggi.",
      },
      {
        name: "Yangtze River Pump",
        slug: "yangtze-river-pump",
        description:
          "Varian pompa industri tangguh asal Tiongkok yang menawarkan nilai ekonomis dengan desain solid untuk pemompaan fluida skala besar, cocok diaplikasikan pada proyek pengairan dan utilitas manufaktur.",
      },
      {
        name: "Torishima",
        slug: "torishima",
        description:
          "Produsen pompa sentrifugal raksasa asal Jepang yang mendominasi pasar infrastruktur global melalui rekayasa teknologi tinggi untuk operasional pembangkit listrik, desalinasi air laut, dan irigasi besar.",
      },
      {
        name: "Milton Roy",
        slug: "milton-roy",
        description:
          "Pimpinan global di bidang pompa dosis (dosing pump) yang memberikan kontrol presisi tinggi untuk aplikasi bahan kimia.",
      },
      {
        name: "Tokico",
        slug: "tokico",
        description:
          "Spesialis dalam alat ukur fluida (flow meter) dan pompa untuk menjamin akurasi tinggi pada perhitungan bahan bakar laut maupun industri.",
      },
    ],
  },

  {
    category: "General",
    slug: "general",
    brands: [
      {
        name: "Crosby",
        slug: "crosby",
        description:
          "Solusi rintisan alat berat (rigging) dan angkat (lifting hardware) dengan standar keamanan tertinggi di seluruh dunia.",
      },
      {
        name: "Kondo",
        slug: "kondo",
        description:
          "Merek andal untuk kebutuhan perlengkapan industri maritim dan general engineering.",
      },
    ],
  },
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
