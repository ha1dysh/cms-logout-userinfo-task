import { Product } from "@prisma/client";
import { TProductImageDto } from "./productImage.dto";
import { TProductReviewDto } from "./productReview.dto";

type ExcludedField =
  | "id"
  | "productImages"
  | "productReviews"
  | "createdAt"
  | "updatedAt"
  | "deletedAt";

export type TProductDto = Omit<Product, ExcludedField> & {
  id: string;
  productImages: TProductImageDto[] | null;
  productReviews: TProductReviewDto[] | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
