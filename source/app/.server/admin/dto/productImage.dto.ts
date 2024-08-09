import { ProductImage } from "@prisma/client";

type ExcludedField =
  | "id"
  | 'productId'
  | "createdAt"
  | "updatedAt"

export type TProductImageDto = Omit<ProductImage, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
