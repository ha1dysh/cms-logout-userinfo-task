import { withZod } from "@rvf/zod";
import { z } from "zod";
import { titleRule, descriptionRule, priceRule, compareAtPriceRule, costPerItemRule, quantityRule, skuRule, barcodeRule, statusRule } from "../ProductsNewForm/ProductsNewForm.validator";

export const productsPrimaryInfoFormValidator = withZod(
  z.object({
    title: titleRule,
    description: descriptionRule,
    price: priceRule,
    compareAtPrice: compareAtPriceRule,
    costPerItem: costPerItemRule,
    quantity: quantityRule,
    sku: skuRule,
    barcode: barcodeRule,
    status: statusRule,
  })
);
