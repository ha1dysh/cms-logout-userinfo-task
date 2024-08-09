import { Card, IndexTable, Link } from "@shopify/polaris";
import { FC, useMemo } from "react";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable/IndexTable";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { IOffsetPaginationInfoDto } from "~/.server/shared/dto/offset-pagination-info.dto";
import { usePagination } from "~/admin/hooks/usePagination";
import { TAdminCategoriesLoaderData } from "~/.server/admin/loaders/categories.loader";
import { TCategoryDto } from "~/.server/admin/dto/category.dto";
import { AdminCategoriesTableFilters } from "./CategoryTableFilters";

export interface CategoriesTableProps {
  categories: TCategoryDto[];
  query?: TAdminCategoriesLoaderData["query"];
  pagination: IOffsetPaginationInfoDto;
}

export const AdminCategoriesTable: FC<CategoriesTableProps> = ({
  categories,
  query,
  pagination,
}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(
    () => ({
      singular: "category",
      plural: "categories",
    }),
    []
  );

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(
    () => [
      { title: "Title" },
      { title: "Description" },
      { title: "Created at" },
      { title: "Updated at" },
      { title: "Deleted at" },
    ],
    []
  );

  const rowMarkup = categories.map(
    ({ id, title, createdAt, updatedAt, deletedAt, description }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
        disabled={deletedAt !== null}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.categories}/${id}`}>{title}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card padding="0">
      <AdminCategoriesTableFilters query={query} />
      <IndexTable
        resourceName={resourceName}
        itemCount={categories.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
