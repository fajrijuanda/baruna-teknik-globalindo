export const CATEGORIES = [
  {
    id: "cat-1",
    name: {
      id: "Pompa Industri",
      en: "Industrial Pump",
    },
    slug: "industrial-pump",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cat-2",
    name: {
      id: "Katup",
      en: "Valve",
    },
    slug: "valve",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const PRODUCTS = [
  {
    id: "prod-1",
    title: {
      id: "Ebara 50x40 FSJA - Centrifugal Pump",
      en: "Ebara 50x40 FSJA - Centrifugal Pump",
    },
    slug: "ebara-50x40-fsja",
    categoryId: "cat-1",
    category: CATEGORIES[0],
    description: {
      id: "Pompa sentrifugal efisiensi tinggi cocok untuk pasokan air, air industri, dan irigasi. Dikenal karena keandalan dan daya tahannya di lingkungan yang keras.",
      en: "High efficiency centrifugal pump suitable for water supply, industrial water, and irrigation. Known for its reliability and durability in harsh environments.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
      },
    ],
    specs: [
      "Capacity: up to 0.4 m3/min",
      "Head: up to 40m",
      "Power: 1.5 kW",
      "Material: Cast Iron",
      "Inlet/Outlet: 50mm / 40mm",
    ],
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod-2",
    title: {
      id: "Kitz Butterfly Valve 10 Inch",
      en: "Kitz Butterfly Valve 10 Inch",
    },
    slug: "kitz-butterfly-valve-10-inch",
    categoryId: "cat-2",
    category: CATEGORIES[1],
    description: {
      id: "Katup kupu-kupu yang tahan lama untuk kontrol aliran di berbagai aplikasi industri. Mudah dipasang dan dirawat.",
      en: "Durable butterfly valve for flow control in various industrial applications. Easy to install and maintain.",
    },
    images: [
      {
        url: "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2574&auto=format&fit=crop",
      },
    ],
    specs: [
      "Size: 10 Inch (DN 250)",
      "Pressure Rating: 10K / 150 PSI",
      "Body Material: Ductile Iron",
      "Disc Material: Stainless Steel 304",
      "Seat: EPDM",
    ],
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const CLIENTS = [
  {
    id: "client-1",
    name: "Pertamina",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/id/thumb/0/05/Logo_Pertamina_%282005%29.svg/1200px-Logo_Pertamina_%282005%29.svg.png",
    isFeatured: true,
  },
  {
    id: "client-2",
    name: "PLN",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_PLN.png/1200px-Logo_PLN.png",
    isFeatured: true,
  },
];

export const PAGE_CONTENT = {
  home: {
    hero: {
      titleId: "Solusi Teknik Terpercaya untuk Industri Anda",
      titleEn: "Trusted Engineering Solutions for Your Industry",
      subtitleId:
        "Kami menyediakan peralatan mekanikal, elektrikal, dan instrumentasi berkualitas tinggi untuk mendukung operasional bisnis Anda.",
      subtitleEn:
        "We provide high-quality mechanical, electrical, and instrumentation equipment to support your business operations.",
      heroImage:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    },
    about: {
      titleId: "Tentang Baruna Teknik",
      titleEn: "About Baruna Teknik",
      contentId:
        "CV Baruna Teknik Globalindo adalah perusahaan yang bergerak di bidang pengadaan barang dan jasa teknik. Kami berkomitmen untuk memberikan pelayanan terbaik dan produk berkualitas...",
      contentEn:
        "CV Baruna Teknik Globalindo is a company engaged in the procurement of technical goods and services. We are committed to providing the best service and quality products...",
    },
    features: {
      titleId: "Mengapa Memilih Kami",
      titleEn: "Why Choose Us",
    },
  },
  about: {
    details: {
      visionId:
        "Menjadi perusahaan penyedia solusi teknik kelas dunia yang inovatif.",
      visionEn:
        "To become a world-class innovative engineering solutions provider.",
      missionId:
        "Memberikan produk dan layanan berkualitas tinggi yang melebihi ekspektasi pelanggan.",
      missionEn:
        "Providing high quality products and services that exceed customer expectations.",
      historyId:
        "Didirikan pada tahun 2010 dengan pengalaman lebih dari satu dekade.",
      historyEn: "Established in 2010 with over a decade of experience.",
      ceoMessageId: "Kami terus berinovasi untuk masa depan industri.",
      ceoMessageEn: "We continue to innovate for the future of the industry.",
    },
  },
  contact: {
    info: {
      address: "Jl. Contoh Alamat No. 123, Jakarta, Indonesia",
      phone: "+62 811 2835 789",
      email: "info@barunateknik.com",
      googleMapsUrl: "https://goo.gl/maps/example",
      facebook: "https://facebook.com/barunateknik",
      instagram: "https://instagram.com/barunateknik",
      linkedin: "https://linkedin.com/company/barunateknik",
    },
  },
};
