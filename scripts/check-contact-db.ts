import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const content = await prisma.pageContent.findUnique({
    where: {
      page_section: {
        page: "contact",
        section: "info",
      },
    },
  });

  console.log(
    "Database Content for contact/info:",
    JSON.stringify(content, null, 2),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
