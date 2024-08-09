import { withZod } from "@rvf/zod";
import { z } from "zod";

export const titleRule = z
  .string()
  .trim()
  .min(1, { message: "Title is required" })

export const descriptionRule = z
  .string()
  .trim()
  .optional();

export const priceRule = z.coerce.number().min(1, { message: "Price is required" });
export const compareAtPriceRule = z.coerce.number().optional();
export const costPerItemRule = z.coerce.number().optional();
export const quantityRule = z.coerce.number().min(1, { message: "Quantity is required" });
export const skuRule = z.string().optional();
export const barcodeRule = z.string().optional();
export const statusRule = z.enum(["ACTIVE", "DRAFT"]).optional();
export const categoryTitleRule = z.string()

export const productsNewFormValidator = withZod(
  z
    .object({
      title: titleRule,
      description: descriptionRule,
      price: priceRule,
      compareAtPrice: compareAtPriceRule,
      costPerItem: costPerItemRule,
      quantity: quantityRule,
      sku: skuRule,
      barcode: barcodeRule,
      status: statusRule,
      categoryTitle: categoryTitleRule,
    })
);
