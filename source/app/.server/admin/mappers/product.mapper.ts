import { Product } from "@prisma/client";
import { TProductDto } from "../dto/product.dto";
import { productImageMapper } from "./productImage.mapper";
import { productReviewMapper } from "./productReview.mapper";

export const productMapper = (product: Product): TProductDto => {
  const productImages =
    "productImages" in product && Array.isArray(product.productImages)
      ? product.productImages.map(productImageMapper)
      : null;

  const productReviews =
    "productReviews" in product && Array.isArray(product.productReviews)
      ? product.productReviews.map(productReviewMapper)
      : null;

  return {
    id: String(product.id),
    slug: product.slug,
    title: product.title,
    description: product.description,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    costPerItem: product.costPerItem,
    quantity: product.quantity,
    sku: product.sku,
    barcode: product.barcode,
    status: product.status,
    avgRating: product.avgRating,
    totalReviews: product.totalReviews,
    categoryId: product.categoryId,
    productImages,
    productReviews,
    createdAt: product.createdAt.toJSON(),
    updatedAt: product.updatedAt.toJSON(),
    deletedAt: product.deletedAt ? product.deletedAt.toJSON() : null,
  };
};
