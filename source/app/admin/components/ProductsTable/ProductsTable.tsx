import { Card, IndexTable, Link } from "@shopify/polaris";
import { FC, useMemo } from "react";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable/IndexTable";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { IOffsetPaginationInfoDto } from "~/.server/shared/dto/offset-pagination-info.dto";
import { usePagination } from "~/admin/hooks/usePagination";
import { TProductDto } from "~/.server/admin/dto/product.dto";
import { TAdminProductsLoaderData } from "~/.server/admin/loaders/products.loader";
import { AdminProductsTableFilters } from "./ProductsTableFilters";

export interface ProductsTableProps {
  products: TProductDto[];
  query?: TAdminProductsLoaderData["query"];
  pagination: IOffsetPaginationInfoDto;
}

export const AdminProductsTable: FC<ProductsTableProps> = ({
  products,
  query,
  pagination,
}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(
    () => ({
      singular: "product",
      plural: "products",
    }),
    []
  );

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(
    () => [
      { title: "Title" },
      { title: "Price" },
      { title: "Quantity" },
      { title: "Sku" },
      { title: "Barcode" },
      { title: "Status" },
      { title: "Created at" },
      { title: "Updated at" },
      { title: "Deleted at" },
    ],
    []
  );

  const rowMarkup = products.map((prod, index) => (
    <IndexTable.Row
      id={prod.id}
      key={prod.id}
      position={index}
      disabled={prod.deletedAt !== null}
    >
      <IndexTable.Cell>
        <Link url={`${EAdminNavigation.products}/${prod.id}`}>{prod.title}</Link>
      </IndexTable.Cell>
      <IndexTable.Cell>{prod.price}</IndexTable.Cell>
      <IndexTable.Cell>{prod.quantity}</IndexTable.Cell>
      <IndexTable.Cell>{prod.sku}</IndexTable.Cell>
      <IndexTable.Cell>{prod.barcode}</IndexTable.Cell>
      <IndexTable.Cell>{prod.status}</IndexTable.Cell>
      <IndexTable.Cell>{prod.createdAt}</IndexTable.Cell>
      <IndexTable.Cell>{prod.updatedAt}</IndexTable.Cell>
      <IndexTable.Cell>{prod.deletedAt}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Card padding="0">
      <AdminProductsTableFilters query={query} />
      <IndexTable
        resourceName={resourceName}
        itemCount={products.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
