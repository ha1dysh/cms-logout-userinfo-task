import {
  ChoiceList,
  IndexFilters,
  IndexFiltersProps,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import React, { FC, useCallback, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import { EProductStatus, TAdminProductsLoaderData } from "~/.server/admin/loaders/products.loader";

export interface ProductsTableFiltersProps {
  query?: TAdminProductsLoaderData["query"];
}

export const AdminProductsTableFilters: FC<ProductsTableFiltersProps> = ({
  query,
}) => {
  const [_, setSearchParams] = useSearchParams();

  const sortOptions: IndexFiltersProps["sortOptions"] = [
    { label: "ID", value: "id asc", directionLabel: "Oldest to newest" },
    { label: "ID", value: "id desc", directionLabel: "Newest to oldest" },
    { label: "Title", value: "title asc", directionLabel: "A-Z" },
    { label: "Title", value: "title desc", directionLabel: "Z-A" },
    { label: "Price", value: "price asc", directionLabel: "Smallest to largest" },
    { label: "Price", value: "price desc", directionLabel: "Largest to smallest" },
    { label: "Quantity", value: "quantity asc", directionLabel: "Smallest to largest" },
    { label: "Quantity", value: "quantity desc", directionLabel: "Largest to smallest" },
    { label: "Created", value: "createdAt asc", directionLabel: "Oldest to newest" },
    { label: "Created", value: "createdAt desc", directionLabel: "Newest to oldest" },
    { label: "Updated", value: "updatedAt asc", directionLabel: "Oldest to newest" },
    { label: "Updated", value: "updatedAt desc", directionLabel: "Newest to oldest" },
    { label: "Deleted", value: "deletedAt asc", directionLabel: "Oldest to newest" },
    { label: "Deleted", value: "deletedAt desc", directionLabel: "Newest to oldest" },
  ];

  const sortOrder = query?.sort || "id_desc";
  const sortSelected = [sortOrder.replace("_", " ")];

  const setSortSelected = (value: string[]) => {
    setSearchParams((prev) => {
      prev.set("sort", value[0].replace(" ", "_"));
      return prev;
    });
  };

  const serverQueryValue = query?.q || "";
  const [queryValue, setQueryValue] = useState(serverQueryValue);

  const timerRef = React.useRef<number | null>(null);

  const handleFiltersQueryChange = useCallback(
    (value: string) => {
      setQueryValue(value);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setSearchParams((prev) => {
          prev.delete("skip");
          prev.delete("take");

          if (value === "") {
            prev.delete("q");
            return prev;
          }

          prev.set("q", value);
          return prev;
        });
      }, 300);
    },
    [setSearchParams]
  );


  const [productStatus, setProductStatus] = useState<
    EProductStatus | undefined
  >(query?.productStatus);

  const { mode, setMode } = useSetIndexFiltersMode();

  const handleAccountStatusChange = useCallback(
    (value: EProductStatus[]) => {
      setProductStatus(value?.[0]);
      setSearchParams((prev) => {
        prev.delete("skip");
        prev.delete("take");

        if (value.length === 0) {
          prev.delete("accountStatus");
          return prev;
        }

        prev.set("accountStatus", value[0]);
        return prev;
      });
    },
    [setSearchParams]
  );

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue("");
    setProductStatus(undefined);

    setSearchParams((prev) => {
      prev.delete("q");
      prev.delete("productStatus");
      prev.delete("skip");
      prev.delete("take");
      return prev;
    });
  }, [setSearchParams, setProductStatus]);

  const filters = [
    {
      key: "productStatus",
      label: "Product Status",
      filter: (
        <ChoiceList
          title="Product"
          titleHidden
          choices={[
            {
              label: "Active",
              value: "active" as const,
            },
            {
              label: "Inactive",
              value: "disabled" as const,
            },
          ]}
          selected={productStatus ? [productStatus] : []}
          onChange={handleAccountStatusChange}
          allowMultiple={false}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters: IndexFiltersProps["appliedFilters"] = [];
  if (productStatus && !isEmpty(productStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: `Account status ${productStatus}`,
      onRemove: handleAccountStatusChange.bind(null, []),
    });
  }
  /* FILTERS END */

  return (
    <IndexFilters
      sortOptions={sortOptions}
      sortSelected={sortSelected}
      queryValue={queryValue}
      queryPlaceholder="Search products"
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={() => handleFiltersQueryChange("")}
      onSort={setSortSelected}
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={handleFiltersClearAll}
      mode={mode}
      setMode={setMode}
      tabs={[]}
      selected={0}
    />
  );
};

function isEmpty(value: string | string[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === "" || value == null;
  }
}
