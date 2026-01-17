import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create Admin
  const email = "admin@barunateknik.com";
  const password = "password123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: "Admin Baruna",
    },
  });

  console.log("Admin created:", admin.email);

  // 2. Create Categories
  const categoriesData = [
    {
      id: "industrial-pump",
      slug: "industrial-pump",
      name: { en: "Industrial Pump", id: "Pompa Industri" },
    },
    {
      id: "valve",
      slug: "valve",
      name: { en: "Valve", id: "Valve" },
    },
    {
      id: "sparepart",
      slug: "sparepart",
      name: { en: "Spare Parts", id: "Suku Cadang" },
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Categories seeded.");

  // 3. Create Products
  const productsData = [
    {
      title: {
        en: "Ebara 50x40 FSJA - Centrifugal Pump",
        id: "Ebara 50x40 FSJA - Pompa Sentrifugal",
      },
      description: {
        en: "High efficiency centrifugal pump suitable for water supply, industrial water, and irrigation.",
        id: "Pompa sentrifugal efisiensi tinggi yang cocok untuk pasokan air, air industri, dan irigasi.",
      },
      slug: "ebara-50x40-fsja",
      categoryId: "industrial-pump",
      isFeatured: true,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: {
        en: "Kitz Butterfly Valve 10 Inch",
        id: "Kitz Butterfly Valve 10 Inci",
      },
      description: {
        en: "Durable butterfly valve for flow control in various industrial applications.",
        id: "Valve kupu-kupu tahan lama untuk kontrol aliran dalam berbagai aplikasi industri.",
      },
      slug: "kitz-butterfly-valve-10-inch",
      categoryId: "valve",
      isFeatured: true,
      image:
        "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=2574&auto=format&fit=crop",
    },
    {
      title: {
        en: "Grundfos CR 10-16 Vertical Pump",
        id: "Grundfos CR 10-16 Pompa Vertikal",
      },
      description: {
        en: "Vertical multistage centrifugal pump for high pressure applications.",
        id: "Pompa sentrifugal multistage vertikal untuk aplikasi tekanan tinggi.",
      },
      slug: "grundfos-cr-10-16",
      categoryId: "industrial-pump",
      isFeatured: true,
      image:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: {
        en: "Torishima ETA-N 65-50-250",
        id: "Torishima ETA-N 65-50-250",
      },
      description: {
        en: "Standardized centrifugal pump for reliable operation in utility services.",
        id: "Pompa sentrifugal terstandarisasi untuk operasi andal dalam layanan utilitas.",
      },
      slug: "torishima-eta-n",
      categoryId: "industrial-pump",
      isFeatured: true,
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2669&auto=format&fit=crop",
    },
    {
      title: { en: "Mechanical Seal Type 1", id: "Mechanical Seal Tipe 1" },
      description: {
        en: "Durable mechanical seal for leak-free pump operation.",
        id: "Seal mekanis tahan lama untuk operasi pompa bebas bocor.",
      },
      slug: "mechanical-seal-type-1",
      categoryId: "sparepart",
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: { en: "Gate Valve ANSI 150", id: "Gate Valve ANSI 150" },
      description: {
        en: "Robust gate valve for precise flow control.",
        id: "Valve gerbang kokoh untuk kontrol aliran yang presisi.",
      },
      slug: "gate-valve-ansi-150",
      categoryId: "valve",
      isFeatured: false,
      image:
        "https://images.unsplash.com/photo-1615826938953-29a33827ec56?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  for (const prod of productsData) {
    const existing = await prisma.product.findUnique({
      where: { slug: prod.slug },
    });
    if (!existing) {
      await prisma.product.create({
        data: {
          title: prod.title,
          description: prod.description,
          slug: prod.slug,
          isFeatured: prod.isFeatured,
          category: { connect: { slug: prod.categoryId } },
          images: {
            create: { url: prod.image }, // Prisma handles ID link
          },
        },
      });
    }
  }
  console.log("Products seeded.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
