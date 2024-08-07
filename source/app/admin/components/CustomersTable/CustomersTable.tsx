import { Card, IndexTable, Link } from "@shopify/polaris";
import { FC, useMemo } from "react";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable/IndexTable";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { IOffsetPaginationInfoDto } from "~/.server/shared/dto/offset-pagination-info.dto";
import { usePagination } from "~/admin/hooks/usePagination";
import type { TAdminCustomersLoaderData } from "~/.server/admin/loaders/customers.loader";
import type { TCustomerDto } from "~/.server/admin/dto/customer.dto";
import { AdminCustomersTableFilters } from "./CustomersTableFilters";

export interface CustomersTableProps {
  customers: TCustomerDto[];
  query?: TAdminCustomersLoaderData["query"];
  pagination: IOffsetPaginationInfoDto;
}

export const AdminCustomersTable: FC<CustomersTableProps> = ({
  customers,
  query,
  pagination,
}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(
    () => ({
      singular: "customer",
      plural: "customers",
    }),
    []
  );

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(
    () => [
      { title: "Email" },
      { title: "First Name" },
      { title: "Last Name" },
      { title: "Phone" },
      { title: "Note" },
      { title: "Created at" },
      { title: "Updated at" },
      { title: "Deleted at" },
    ],
    []
  );

  const rowMarkup = customers.map(
    ({ id, firstName, lastName, email, phone, note, createdAt, updatedAt, deletedAt }, index) => (
      <IndexTable.Row id={id} key={id} position={index} disabled={deletedAt !== null}>
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.customers}/${id}`}>{email}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{firstName}</IndexTable.Cell>
        <IndexTable.Cell>{lastName}</IndexTable.Cell>
        <IndexTable.Cell>{phone}</IndexTable.Cell>
        <IndexTable.Cell>{note}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card padding="0">
      <AdminCustomersTableFilters query={query} />
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
