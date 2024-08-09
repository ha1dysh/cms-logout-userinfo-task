import type { PrismaClient } from "@prisma/client";

export const createAddresses = async (prisma: PrismaClient) => {
  console.log("Seeding Addresses");

  const customersAddress = Array.from({ length: 30 }, (_, i) => {
    return {
      customerId: i + 1,
      country: `country-${i}`,
      firstName: `firstName-${i}`,
      lastName: `lastName-${i}`,
      company: `company-${i}`,
      address: `address-${i}`,
      apartment: `apartment-${i}`,
      city: `city-${i}`,
      postalCode: i,
      phone: `phone-${i}`,
    };
  });

  await prisma.customerAddress.createMany({ data: customersAddress});
};



