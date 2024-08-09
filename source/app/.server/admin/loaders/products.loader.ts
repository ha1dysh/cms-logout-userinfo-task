import { json, LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/server-runtime";
import { IOffsetPaginationInfoDto } from "~/.server/shared/dto/offset-pagination-info.dto";
import { productMapper } from "../mappers/product.mapper";

type ProductOrderByWithRelationInput = Prisma.ProductOrderByWithRelationInput;

export enum EProductStatus {
  active = "active",
  disabled = "disabled",
}

export enum EProductsSortVariant {
  id_asc = "id_asc",
  id_desc = "id_desc",
  title_asc = "title_asc",
  title_desc = "title_desc",
  price_asc = "price_asc",
  price_desc = "price_desc",
  quantity_asc = "quantity_asc",
  quantity_desc = "quantity_desc",
  createdAt_asc = "createdAt_asc",
  createdAt_desc = "createdAt_desc",
  updatedAt_asc = "updatedAt_asc",
  updatedAt_desc = "updatedAt_desc",
  deletedAt_asc = "deletedAt_asc",
  deletedAt_desc = "deletedAt_desc",
}

export const sortValueToField = <O extends object>(value: string) => {
  const [field, order] = value.split("_");
  return {
    [field]: order,
  } as O;
};

export const productQueryValidator = withZod(
  z.object({
    take: z.coerce.number().int().positive().optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    q: z.string().optional(),
    productStatus: z.nativeEnum(EProductStatus).optional(),
    sort: z.nativeEnum(EProductsSortVariant).optional(),
  })
);

export async function adminProductsLoader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const { data } = await productQueryValidator.validate(searchParams);

  let take = 10;
  let skip = 0;
  let searchQuery;
  let filterProductStatusQuery;
  let orderBy: ProductOrderByWithRelationInput = { id: "desc" as const };

  if (data?.take) {
    take = data.take;
  }

  if (data?.skip) {
    skip = data.skip;
  }

  if (data?.q) {
    searchQuery = {
      OR: [
        { slug: { contains: data?.q, mode: "insensitive" as const } },
        { title: { contains: data?.q, mode: "insensitive" as const } },
        { sku: { contains: data?.q, mode: "insensitive" as const } },
        { barcode: { contains: data?.q, mode: "insensitive" as const } },
      ],
    };
  }

  if (data?.productStatus === EProductStatus.disabled) {
    filterProductStatusQuery = {
      deletedAt: {
        not: null,
      },
    };
  }

  if (data?.productStatus === EProductStatus.active) {
    filterProductStatusQuery = {
      deletedAt: null,
    };
  }

  if (data?.sort) {
    orderBy = sortValueToField<ProductOrderByWithRelationInput>(data.sort);
  }

  const pagination: IOffsetPaginationInfoDto = {
    take,
    skip,
    hasNext: false,
    hasPrevious: skip > 0,
    total: 0,
    count: 0,
  };

  const products = await prisma.product.findMany({
    take,
    skip,
    where: {
      ...searchQuery,
      ...filterProductStatusQuery,
    },
    orderBy,
  });

  pagination.count = products.length;
  pagination.total = await prisma.product.count({
    where: {
      ...searchQuery,
      ...filterProductStatusQuery,
    },
  });

  pagination.hasNext = skip + take < pagination.total;

  return json({ products: products.map(productMapper), query: data, pagination });
}

export type TAdminProductsLoaderData = SerializeFrom<typeof adminProductsLoader>;
