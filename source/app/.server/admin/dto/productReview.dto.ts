import { ProductReview } from "@prisma/client";

type ExcludedField =
  | "id"
  | 'productId'
  | "customerId"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"

export type TProductReviewDto = Omit<ProductReview, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
