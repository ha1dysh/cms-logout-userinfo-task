import { json, LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/server-runtime";
import { IOffsetPaginationInfoDto } from "~/.server/shared/dto/offset-pagination-info.dto";
import { categoryMapper } from "../mappers/category.mapper";

type CategoryOrderByWithRelationInput = Prisma.CategoryOrderByWithRelationInput;

export enum ECategoriesSortVariant {
  id_asc = "id_asc",
  id_desc = "id_desc",
  title_asc = "title_asc",
  title_desc = "title_desc",
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

export const categoryQueryValidator = withZod(
  z.object({
    take: z.coerce.number().int().positive().optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    q: z.string().optional(),
    sort: z.nativeEnum(ECategoriesSortVariant).optional(),
  })
);

export async function adminCategoriesLoader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const { data } = await categoryQueryValidator.validate(searchParams);

  let take = 10;
  let skip = 0;
  let searchQuery;
  let orderBy: CategoryOrderByWithRelationInput = { id: "desc" as const };

  if (data?.take) {
    take = data.take;
  }

  if (data?.skip) {
    skip = data.skip;
  }

  if (data?.q) {
    searchQuery = {
      OR: [
        { title: { contains: data?.q, mode: "insensitive" as const } },
      ],
    };
  }

  if (data?.sort) {
    orderBy = sortValueToField<CategoryOrderByWithRelationInput>(data.sort);
  }

  const pagination: IOffsetPaginationInfoDto = {
    take,
    skip,
    hasNext: false,
    hasPrevious: skip > 0,
    total: 0,
    count: 0,
  };

  const categories = await prisma.category.findMany({
    take,
    skip,
    where: {
      ...searchQuery,
    },
    orderBy,
  });

  pagination.count = categories.length;
  pagination.total = await prisma.category.count({
    where: {
      ...searchQuery,
    },
  });

  pagination.hasNext = skip + take < pagination.total;

  return json({ categories: categories.map(categoryMapper), query: data, pagination });
}

export type TAdminCategoriesLoaderData = SerializeFrom<typeof adminCategoriesLoader>;
