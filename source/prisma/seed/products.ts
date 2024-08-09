import type { PrismaClient } from "@prisma/client";

export const createProducts = async (prisma: PrismaClient) => {
  console.log("Seeding Products");

  const products = Array.from({ length: 30 }, (_, i) => {
    return {
      slug: `product-slug-${i}`,
      title: `Product title ${i}`,
      description: `Product description ${i}`,
      price: Math.ceil(Math.random() * 100),
      quantity: Math.ceil(Math.random() * 100),
      avgRating: Math.ceil(Math.random() * 10),
      totalReviews: Math.ceil(Math.random() * 50),
      categoryId: Math.ceil(Math.random() * 5),
    };
  });

  await prisma.product.createMany({ data: products});
};



