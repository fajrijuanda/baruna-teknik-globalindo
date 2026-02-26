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
    logoUrl: "/images/clients/media__1771831858264.png",
    isFeatured: true,
  },
  {
    id: "client-2",
    name: "WEG",
    logoUrl: "/images/clients/weg_real.png",
    isFeatured: true,
  },
  {
    id: "client-3",
    name: "Siemens",
    logoUrl: "/images/clients/media__1771831858309.png",
    isFeatured: true,
  },
  {
    id: "client-4",
    name: "Milton Roy",
    logoUrl: "/images/clients/milton_roy_real.png",
    isFeatured: true,
  },
  {
    id: "client-5",
    name: "CNP",
    logoUrl: "/images/clients/cnp_real.png",
    isFeatured: true,
  },
  {
    id: "client-6",
    name: "Flugo",
    logoUrl: "/images/clients/flugo_real.png",
    isFeatured: true,
  },
  {
    id: "client-7",
    name: "KSB",
    logoUrl: "/images/clients/ksb.svg",
    isFeatured: false,
  },
  {
    id: "client-8",
    name: "Ebara",
    logoUrl: "/images/clients/ebara_real.png",
    isFeatured: true,
  },
  {
    id: "client-9",
    name: "Wilo",
    logoUrl: "/images/clients/wilo.svg",
    isFeatured: false,
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
  {
    id: "client-15",
    name: "Titan",
    logoUrl: "/images/placeholder.jpg",
    isFeatured: false,
  },
  {
    id: "client-16",
    name: "Yuema",
    logoUrl: "/images/placeholder.jpg",
    isFeatured: false,
  },
  {
    id: "client-17",
    name: "CMP",
    logoUrl: "/images/clients/cmp-catalog.jpg",
    isFeatured: false,
  },
  {
    id: "client-18",
    name: "Elektrim",
    logoUrl: "/images/placeholder.jpg",
    isFeatured: false,
  },
  {
    id: "client-19",
    name: "Brook Crompton",
    logoUrl: "/images/placeholder.jpg",
    isFeatured: false,
  },
  {
    id: "client-20",
    name: "Emec",
    logoUrl: "/images/placeholder.jpg",
    isFeatured: false,
  },
  {
    id: "client-21",
    name: "Yangtze River Pump",
    logoUrl: "/images/placeholder.jpg",
    isFeatured: false,
  },
  {
    id: "client-22",
    name: "Torishima",
    logoUrl: "/images/placeholder.jpg",
    isFeatured: false,
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
        "PT. Baruna Teknik Globalindo adalah Perusahaan yang bergerak di bidang machining dan general trading dengan tujuan utama menyediakan solusi berkualitas tinggi bagi kebutuhan industri di seluruh indonesia dan berbagai layanan seperti perdagangan besar mesin, peralatan, perlengkapan industri, serta jasa industri untuk pengerjaan khusus logam. Kami memastikan setiap produk dan layanan yang kami tawarkan memenuhi standar kualitas dan efisiensi tertinggi. Dan didukung oleh tim profesional yang berpengalaman serta teknologi terkini.\n\nPT. Baruna Teknik Globalindo memiliki inovasi berkelanjutan dan pelayanan yang prima. Kami memahami bahwa setiap pelanggan memiliki kebutuhan unik, dan oleh karena itu, kami menawarkan solusi yang disesuaikan untuk memastikan kepuasan pelanggan maksimal.",
      contentEn:
        "PT. Baruna Teknik Globalindo is a company engaged in machining and general trading with the main goal of providing high-quality solutions for industrial needs throughout Indonesia. We offer various services such as wholesale trade of machinery, equipment, industrial supplies, and industrial services for special metal works. We ensure every product and service we offer meets the highest standards of quality and efficiency. Supported by a team of experienced professionals and the latest technology.\n\nPT. Baruna Teknik Globalindo features continuous innovation and prime service. We understand that every customer has unique needs, and therefore, we offer customized solutions to ensure maximum customer satisfaction.",
    },
    features: {
      titleId: "Layanan Usaha",
      titleEn: "Business Services",
      services: [
        {
          titleId: "Pump Specialist & Electric Motors",
          titleEn: "Pump Specialist & Electric Motors",
          descriptionId:
            "Cari solusi buat kebutuhan pompa industri atau motor listrik? PT. Baruna Teknik Globalindo siap bantu! Kami punya pilihan lengkap dari pompa sentrifugal, pompa submersible, sampai berbagai spesifikasi dinamo motor listrik yang tangguh. Gak cuma jual barang nih, tim ahli kami juga siap bantu mulai dari konsultasi milih unit yang pas, proses pasang yang rapi, plus layanan after-sales yang pastinya terjamin. Intinya, kami pengen bantu bisnis kamu tetap jalan maksimal dan efisien tanpa takut mesin gampang rewel atau downtime kelamaan.",
          descriptionEn:
            "Looking for industrial pump or electric motor solutions? PT. Baruna Teknik Globalindo is ready to help! We've got a complete lineup from centrifugal and submersible pumps to tough, reliable electric motor specs. We don't just sell products—our expert team is here to guide you from choosing the right unit and ensuring neat installation, to providing guaranteed after-sales support. Bottom line: we want to keep your business running efficiently and at its best, so you don't have to stress about machine breakdowns or long downtimes.",
        },
        {
          titleId: "General Trading",
          titleEn: "General Trading",
          descriptionId:
            "Buat urusan barang dan perlengkapan industri harian, serahin aja ke layanan General Supply kami. Dari mulai aneka perkakas, peralatan listrik, sistem pneumatik, alat safety (K3), sampai kebutuhan rutin kayak pelumas dan pembersih industri, semuanya ada! Karena jaringan supplier kami luas dan tepercaya, kamu bisa dapetin barang kualitas juara dengan harga yang pastinya lebih ramah di kantong. Layanan ini emang dibikin buat mantepin operasional harian kamu biar pengadaan makin praktis dan cepet. Tinggal fokus aja jalanin bisnis, urusan stok barang yang habis biar kami yang urus!",
          descriptionEn:
            "For all your daily industrial goods and equipment needs, just leave it to our General Supply service! Whether you need tools, electrical equipment, pneumatic systems, safety gear (HSE), or everyday consumables like lubricants and industrial cleaners, we've got you covered. Thanks to our wide and trusted network of suppliers, you'll get top-notch quality products at much friendlier prices. This service is designed to keep your daily operations running smoothly and make procurement quick and hassle-free. Just focus on growing your business, and let us handle your inventory supply!",
        },
      ],
    },
  },
  about: {
    details: {
      visionId:
        "Menjadi perusahaan terdepan dalam bidang machining dan general supply, yang dikenal akan inovasi, kualitas, dan pelayanan terbaik kepada pelanggan di seluruh Indonesia.",
      visionEn:
        "To become a leading company in the field of machining and general supply, known for innovation, quality, and the best service to customers throughout Indonesia.",
      missionListId: [
        "Menyediakan produk dan layanan machining serta general supply yang berkualitas tinggi dan tepat waktu untuk memenuhi kebutuhan pelanggan.",
        "Mengembangkan solusi inovatif dan efisien yang dapat meningkatkan produktivitas dan kinerja industri.",
        "Membangun kemitraan yang kuat dan saling menguntungkan dengan pelanggan dan pemasok untuk mencapai kesuksesan bersama.",
      ],
      missionListEn: [
        "Providing high-quality and timely machining and general supply products and services to meet customer needs.",
        "Developing innovative and efficient solutions that can increase industrial productivity and performance.",
        "Building strong and mutually beneficial partnerships with customers and suppliers to achieve mutual success.",
      ],
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
      phone: "+62 877-8848-7287",
      email: "admin@barunateknikglobalindo.com",
      googleMapsUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.034338908752!2d106.8643883!3d-6.2378902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3a14acccdbb%3A0xcfabcbf8b84d1685!2sJl.%20Letjen%20M.T.%20Haryono%20Kav.%2010%2C%20Bidara%20Cina%2C%20Kec.%20Jatinegara%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013330!5e0!3m2!1sen!2sid!4v1709623832159!5m2!1sen!2sid",
      facebook: "https://facebook.com/barunateknik",
      instagram: "https://instagram.com/barunateknik",
      linkedin: "https://linkedin.com/company/barunateknik",
    },
  },
};
