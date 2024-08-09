import type { PrismaClient } from "@prisma/client";

export const createProductsReview = async (prisma: PrismaClient) => {
  console.log("Seeding Products Review");

  const productsReview = Array.from({ length: 30 }, (_, i) => {
    return {
      rate: Math.floor(Math.random() * 10),
      review: `Product review ${i}`,
      productId: i + 1,
      customerId: i + 1,
    };
  });

  await prisma.productReview.createMany({ data: productsReview});
};
