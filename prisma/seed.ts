import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Clients (Example data from previous step, just ensuring they exist or can be skipped)
  // We will focus on PageContent here as requested.

  // --- Home Page Content ---

  // 1. Hero Section
  await prisma.pageContent.upsert({
    where: { page_section: { page: "home", section: "hero" } },
    update: {},
    create: {
      page: "home",
      section: "hero",
      content: {
        heroImage:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070", // Default placeholder
        titleEn: "YOUR TRUSTED PARTNER FOR INDUSTRIAL SOLUTIONS",
        titleId: "MITRA TERPERCAYA UNTUK SOLUSI INDUSTRI",
        subtitleEn:
          "Specialist in Industrial Pumps, Valves, and Spareparts. Committed to excellence, we provide high-quality products to support your operational success.",
        subtitleId:
          "Spesialis dalam Pompa Industri, Valve, dan Suku Cadang. Berkomitmen pada keunggulan, kami menyediakan produk berkualitas tinggi untuk mendukung kesuksesan operasional Anda.",
      },
    },
  });

  // 2. About Section
  await prisma.pageContent.upsert({
    where: { page_section: { page: "home", section: "about" } },
    update: {},
    create: {
      page: "home",
      section: "about",
      content: {
        image: "/images/about-image.png",
        titleEn: "ABOUT PT BARUNA TEKNIK GLOBALINDO",
        titleId: "TENTANG PT BARUNA TEKNIK GLOBALINDO",
        descriptionEn:
          "Established in the heart of Indonesia's industrial sector, PT Baruna Teknik Globalindo has grown to become a premier distributor for industrial pumps, valves, and engineering solutions.",
        descriptionId:
          "Berdiri di jantung kawasan industri Indonesia, PT Baruna Teknik Globalindo telah tumbuh menjadi distributor terkemuka untuk pompa industri, valve, dan solusi teknik. Kami menjembatani kesenjangan antara produsen kelas dunia dan industri lokal.",
        stat1LabelEn: "Years Experience",
        stat1LabelId: "Tahun Pengalaman",
        stat2LabelEn: "Happy Clients",
        stat2LabelId: "Klien Puas",
        stat3LabelEn: "Partner Brands",
        stat3LabelId: "Merek Mitra",
        ctaTextEn: "Learn More About Us",
        ctaTextId: "Pelajari Lebih Lanjut",
      },
    },
  });

  // 3. Features Section
  await prisma.pageContent.upsert({
    where: { page_section: { page: "home", section: "features" } },
    update: {},
    create: {
      page: "home",
      section: "features",
      content: {
        titleEn: "WHY CHOOSE US",
        titleId: "MENGAPA MEMILIH KAMI",
        subtitleEn:
          "We deliver more than just products; we provide complete industrial solutions tailored to your operational needs.",
        subtitleId:
          "Kami memberikan lebih dari sekadar produk; kami memberikan solusi industri lengkap yang disesuaikan dengan kebutuhan operasional Anda.",
        // Note: Individual cards are kept static for MVP simplicity as per plan, or can be added later if needed.
      },
    },
  });

  // 4. Testimonials Section
  await prisma.pageContent.upsert({
    where: { page_section: { page: "home", section: "testimonials" } },
    update: {},
    create: {
      page: "home",
      section: "testimonials",
      content: {
        titleEn: "CLIENT TESTIMONIALS",
        titleId: "TESTIMONI KLIEN",
        subtitleEn: "What our partners say about our products and services.",
        subtitleId: "Apa kata mitra kami tentang produk dan layanan kami.",
      },
    },
  });

  // 5. Contact Info
  await prisma.pageContent.upsert({
    where: { page_section: { page: "contact", section: "info" } },
    update: {
      content: {
        address:
          "Jl. Letjen M.T. Haryono No.Kav.10, Bidara Cina, Kecamatan Jatinegara, Jakarta, Daerah Khusus Ibukota Jakarta 13330",
        phone: "0877-8848-7287",
        email: "info@barunateknik.co.id",
        hours: "Senin - Jumat: 08:00 - 17:00",
        hoursDesc:
          "Hari Sabtu & Minggu Libur\nLayanan Darurat 24 Jam via WhatsApp",
        googleMapsUrl:
          "https://maps.google.com/maps?q=Jl.+Letjen+M.T.+Haryono+No.Kav.10,+Jakarta&z=15&output=embed",
        facebook: "https://facebook.com/barunateknik",
        instagram: "https://instagram.com/barunateknik",
        linkedin: "https://linkedin.com/company/baruna-teknik",
      },
    },
    create: {
      page: "contact",
      section: "info",
      content: {
        address:
          "Jl. Letjen M.T. Haryono No.Kav.10, Bidara Cina, Kecamatan Jatinegara, Jakarta, Daerah Khusus Ibukota Jakarta 13330",
        phone: "0877-8848-7287",
        email: "info@barunateknik.co.id",
        hours: "Senin - Jumat: 08:00 - 17:00",
        hoursDesc:
          "Hari Sabtu & Minggu Libur\nLayanan Darurat 24 Jam via WhatsApp",
        googleMapsUrl:
          "https://maps.google.com/maps?q=Jl.+Letjen+M.T.+Haryono+No.Kav.10,+Jakarta&z=15&output=embed",
        facebook: "https://facebook.com/barunateknik",
        instagram: "https://instagram.com/barunateknik",
        linkedin: "https://linkedin.com/company/baruna-teknik",
      },
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
