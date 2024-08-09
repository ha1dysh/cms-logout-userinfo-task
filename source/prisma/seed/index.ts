import { PrismaClient } from "@prisma/client";
import { createDefaultAdmin } from "./default-admin";
import { createCustomers } from "./customers";
import { createUsers } from "./users";
import { createAddresses } from "./addresses";
import { createProducts } from "./products";
import { createProductsImage } from "./products-image";
import { createProductsReview } from "./products-review";
import { createCategories } from "./categories";

async function main() {
  const prisma = new PrismaClient();

  await createDefaultAdmin(prisma);
  await createUsers(prisma)
  await createCustomers(prisma);
  await createAddresses(prisma);
  await createCategories(prisma);
  await createProducts(prisma);
  await createProductsImage(prisma);
  await createProductsReview(prisma);
}

main().catch(console.error);
