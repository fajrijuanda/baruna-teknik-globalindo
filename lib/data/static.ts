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
    name: "TECO",
    logoUrl: "/images/clients/teco.png",
    isFeatured: true,
  },
  {
    id: "client-2",
    name: "WEG",
    logoUrl: "/images/clients/weg.png",
    isFeatured: true,
  },
  {
    id: "client-3",
    name: "Siemens",
    logoUrl: "/images/clients/siemens.png",
    isFeatured: true,
  },
  {
    id: "client-4",
    name: "Milton Roy",
    logoUrl: "/images/clients/milton_roy.png",
    isFeatured: true,
  },
  {
    id: "client-5",
    name: "CNP",
    logoUrl: "/images/clients/cnp.png",
    isFeatured: true,
  },
  {
    id: "client-6",
    name: "Flugo",
    logoUrl: "/images/clients/flugo.png",
    isFeatured: true,
  },
  {
    id: "client-7",
    name: "KSB",
    logoUrl: "/images/clients/ksb.png",
    isFeatured: true,
  },
  {
    id: "client-8",
    name: "Ebara",
    logoUrl: "/images/clients/ebara.png",
    isFeatured: true,
  },
  {
    id: "client-9",
    name: "Wilo",
    logoUrl: "/images/clients/wilo.png",
    isFeatured: true,
  },
  {
    id: "client-10",
    name: "Maktec",
    logoUrl: "/images/clients/maktec.png",
    isFeatured: true,
  },
  {
    id: "client-11",
    name: "Tokico",
    logoUrl: "/images/clients/tokico.png",
    isFeatured: true,
  },
  {
    id: "client-12",
    name: "Arita",
    logoUrl: "/images/clients/arita.png",
    isFeatured: true,
  },
  {
    id: "client-13",
    name: "Ebro Armaturen",
    logoUrl: "/images/clients/ebro.png",
    isFeatured: true,
  },
  {
    id: "client-14",
    name: "Bosch",
    logoUrl: "/images/clients/bosch.png",
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
      address:
        "MT Haryono St No.Kav.10, Bidara Cina, Jatinegara, Jakarta 13330",
      phone: "+62 811 2835 789",
      email: "info@barunateknik.com",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.034338908752!2d106.8643883!3d-6.2378902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3a14acccdbb%3A0xcfabcbf8b84d1685!2sJl.%20Letjen%20M.T.%20Haryono%20Kav.%2010%2C%20Bidara%20Cina%2C%20Kec.%20Jatinegara%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013330!5e0!3m2!1sen!2sid!4v1709623832159!5m2!1sen!2sid",
      facebook: "https://facebook.com/barunateknik",
      instagram: "https://instagram.com/barunateknik",
      linkedin: "https://linkedin.com/company/barunateknik",
    },
  },
};
