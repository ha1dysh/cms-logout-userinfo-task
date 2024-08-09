import type { PrismaClient } from "@prisma/client";

export const createCustomers = async (prisma: PrismaClient) => {
  console.log("Seeding Customers");

  const customers = Array.from({ length: 30 }, (_, i) => {
    return {
      firstName: `firstName-${i}`,
      lastName: `lastName-${i}`,
      email: `email-${i}`,
      password: `password-${i}`,
    };
  });

  await prisma.customer.createMany({ data: customers  });
};
