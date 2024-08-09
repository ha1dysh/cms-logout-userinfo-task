import { ProductReview } from "@prisma/client";
import { TProductReviewDto } from "../dto/productReview.dto";

export const productReviewMapper = (productReview: ProductReview): TProductReviewDto => {
  return {
    id: String(productReview.id),
    rate: productReview.rate,
    review: productReview.review,
    createdAt: productReview.createdAt.toJSON(),
    updatedAt: productReview.updatedAt.toJSON(),
    deletedAt: productReview.deletedAt ? productReview.deletedAt.toJSON() : null,
  };
};
