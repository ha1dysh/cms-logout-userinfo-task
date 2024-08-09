/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerAddress" DROP CONSTRAINT "CustomerAddress_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_customerId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_productId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "CustomerAddress";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "ProductReview";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "AdminRole";

-- DropEnum
DROP TYPE "ProductStatus";
