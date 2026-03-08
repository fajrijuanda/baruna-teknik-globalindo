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
  catalogs?: { name: string; url: string }[];
  images?: string[];
  partnerLogos?: string[];
}

export interface CategoryMenuLink {
  category: string;
  slug: string;
  brands: BrandMenuLink[];
}

export const PRODUCT_BRANDS_MENU: readonly CategoryMenuLink[] = [
  {
    category: "Elektrik Motor",
    slug: "electric-motors",
    brands: [
      {
        name: "CMP",
        slug: "cmp",
        description:
          "CMP (Century Motors Producer) adalah merek motor listrik asal Australia (diproduksi di China) yang banyak digunakan untuk kebutuhan industri dan komersial. Motor ini dikenal karena efisiensinya dan sering digunakan sebagai penggerak pada sistem pompa, konveyor, dan mesin manufaktur lainnya.",
        catalogs: [
          {
            name: "Katalog Umum CMP Motors",
            url: "/catalog/CMP-Motors-Catalogue.pdf",
          },
          {
            name: "CMP NEMA NEP Series (Premium Efficiency)",
            url: "/catalog/CMP NEMA MOTOR - NEP Series Premium Efficiency-1.pdf",
          },
        ],
        images: [
          "/images/products/cmp-1.jpeg",
          "/images/products/cmp-2.jpeg",
          "/images/products/cmp-3.jpeg",
          "/images/products/cmp-4.jpeg",
          "/images/products/cmp-5.jpeg",
        ],
      },
      {
        name: "TECO",
        slug: "teco",
        description:
          "Merek asal Taiwan yang dikenal handal dengan desain fungsional dan efisiensi energi yang baik. Cocok untuk kebutuhan industri, gedung komersial, hingga perumahan modern dengan perawatan mudah dan daya tahan tinggi.",
        catalogs: [
          {
            name: "Brosur TECO AESV/AESU Series",
            url: "/catalog/Brosur Teco AESV AESU AESV-LA Series SCIM.pdf",
          },
        ],
        images: [
          "/images/products/teco-1.jpeg",
          "/images/products/teco-2.jpeg",
          "/images/products/teco-3.jpeg",
        ],
      },
      {
        name: "WEG",
        slug: "weg",
        description:
          "Produsen multinasional asal Brasil yang menawarkan motor listrik performa tinggi dan hemat energi. Tersedia untuk berbagai aplikasi mulai dari pompa besar, kompresor, hingga kebutuhan industri berat.",
        catalogs: [
          {
            name: "WEG W21 Three Phase Motors",
            url: "/catalog/WEG-WMO-W21-three-phase-induction-motors-chinese-market-50066711-brochure-english-web.pdf",
          },
          {
            name: "WEG W20 Asia Series",
            url: "/catalog/WEG-w20-WMO-asia-50124127-brochure-english-web.pdf",
          },
          { name: "WEG NEMA Motors", url: "/catalog/WNema_260208_190827.pdf" },
        ],
        images: [
          "/images/products/weg-1.jpeg",
          "/images/products/weg-2.jpeg",
          "/images/products/weg-3.jpeg",
          "/images/products/weg-4.jpeg",
          "/images/products/weg-5.jpeg",
          "/images/products/weg-6.jpeg",
          "/images/products/weg-7.jpeg",
          "/images/products/weg-8.jpeg",
          "/images/products/weg-9.jpeg",
        ],
      },
      {
        name: "Brook Crompton",
        slug: "brook-crompton",
        description:
          "Produsen motor listrik asal Inggris dengan pengalaman lebih dari 100 tahun. Dikenal luas di sektor pertambangan, water treatment, dan manufaktur berkat kualitas, keandalan, serta efisiensi energi yang terdepan.",
        catalogs: [
          {
            name: "Brosur Brook Crompton WE3-5",
            url: "/catalog/BC brochure - WE3-5.pdf",
          },
        ],
        images: [
          "/images/products/brook-crompton-1.jpeg",
          "/images/products/brook-crompton-2.jpeg",
          "/images/products/brook-crompton-3.jpeg",
          "/images/products/brook-crompton-4.jpeg",
          "/images/products/brook-crompton-5.jpeg",
        ],
      },
      {
        name: "Titan",
        slug: "titan",
        description:
          "Motor listrik yang menawarkan keseimbangan antara harga terjangkau dan performa stabil, cocok untuk kebutuhan operasional industri sehari-hari.",
        catalogs: [
          {
            name: "Brosur Motor Electric Titan",
            url: "/catalog/Brosur Motor Electric TITAN.pdf",
          },
        ],
        images: ["/images/products/titan-1.jpeg"],
      },
      {
        name: "Yuema",
        slug: "yuema",
        description:
          "Solusi motor listrik ekonomis untuk keperluan standar industri. Hemat energi dengan daya tahan operasional yang baik untuk pemakaian harian.",
        catalogs: [
          {
            name: "Brosur Yuema Motor YU & SA",
            url: "/catalog/Brosur_Yuema_Motor_YU_&_SA.pdf",
          },
        ],
      },
      {
        name: "Elektrim",
        slug: "elektrim",
        description:
          "Motor listrik buatan Eropa (Polandia) dengan reputasi kuat untuk keandalan jangka panjang. Tersedia hingga 6300 HP untuk berbagai aplikasi industri seperti manufaktur, oil & gas, dan pertambangan.",
        catalogs: [
          {
            name: "Katalog Elektrim IE1/IE3",
            url: "/catalog/EMM ELEKTRIM IE1_IE3 katalog_removed (2).pdf",
          },
        ],
        images: [
          "/images/products/elektrim-1.jpeg",
          "/images/products/elektrim-2.jpeg",
          "/images/products/elektrim-3.jpeg",
          "/images/products/elektrim-4.jpeg",
          "/images/products/elektrim-5.jpeg",
          "/images/products/elektrim-6.jpeg",
          "/images/products/elektrim-7.jpeg",
          "/images/products/elektrim-8.jpeg",
        ],
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
        name: "General Supply",
        slug: "general-supply",
        description:
          "Solusi lengkap untuk berbagai macam kebutuhan barang dan perlengkapan industri harian Anda. Kami menyediakan mulai dari alat perkakas presisi, perlengkapan kelistrikan yang aman, sistem pneumatik, alat keselamatan kerja (K3) standar tinggi, perkengkapan kebersihan profesional, hingga bahan maintenance harian seperti pelumas dan chemical khusus industri. Melalui jaringan mitra global, kami memastikan kualitas dan ketersediaan barang untuk menjaga kelancaran operasional perusahaan Anda.",
        images: ["/images/products/general-1.jpeg"],
        partnerLogos: [
          "/images/general/3m.png",
          "/images/general/broco.png",
          "/images/general/dekson.png",
          "/images/general/dynabrade.png",
          "/images/general/elora.png",
          "/images/general/fluke.png",
          "/images/general/karcher.png",
          "/images/general/krisbow.png",
          "/images/general/metabo.png",
          "/images/general/philips.png",
          "/images/general/schneider.png",
          "/images/general/sellery.png",
          "/images/general/stanley.png",
          "/images/general/toto.png",
        ],
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
