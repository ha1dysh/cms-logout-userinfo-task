/*
  Warnings:

  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToProduct" DROP CONSTRAINT "_CategoryToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_CategoryToProduct";

-- CreateIndex
CREATE UNIQUE INDEX "Category_productId_key" ON "Category"("productId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
