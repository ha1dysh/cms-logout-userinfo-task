import type { PrismaClient } from "@prisma/client";

export const createCategories = async (prisma: PrismaClient) => {
  console.log("Seeding  Categories");

  Array.from({ length: 5 }, async (_, i) => {
    const category = {
      title: `Category ${i + 1}`,
      description: `Description for Category ${i + 1}`,
      image: "https://cataas.com/cat",
    };
    await prisma.category.create({
      data: { ...category },
    });
  });
};
