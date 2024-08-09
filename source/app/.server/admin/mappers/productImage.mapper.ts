import { ProductImage } from "@prisma/client";
import { TProductImageDto } from "../dto/productImage.dto";

export const productImageMapper = (productImage: ProductImage): TProductImageDto => {
  return {
    id: String(productImage.id),
    image: productImage.image,
    createdAt: productImage.createdAt.toJSON(),
    updatedAt: productImage.updatedAt.toJSON(),
  };
};
