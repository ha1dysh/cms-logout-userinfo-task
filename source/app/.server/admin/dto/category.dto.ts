import { Category } from "@prisma/client";
import { TProductDto } from "./product.dto";

type ExcludedField = "id" | "product" | "createdAt" | "updatedAt" | "deletedAt";

export type TCategoryDto = Omit<Category, ExcludedField> & {
  id: string;
  products: TProductDto[] | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
