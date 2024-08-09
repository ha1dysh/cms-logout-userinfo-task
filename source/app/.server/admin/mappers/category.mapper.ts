import {Category} from '@prisma/client';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { productMapper } from './product.mapper';

export const categoryMapper = (category: Category): TCategoryDto => {
  const products =
    "products" in category && Array.isArray(category.products)
      ? category.products.map(productMapper)
      : null;

  return {
    id: String(category.id),
    title: category.title,
    description: category.description,
    image: category.image,
    products,
    createdAt: category.createdAt.toJSON(),
    updatedAt: category.updatedAt.toJSON(),
    deletedAt: category.deletedAt ? category.deletedAt.toJSON() : null,
  };
};
