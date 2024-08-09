import {
  ChoiceList,
  IndexFilters,
  IndexFiltersProps,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import React, { FC, useCallback, useState } from "react";
import type { TAdminCategoriesLoaderData } from "~/.server/admin/loaders/categories.loader";
import { useSearchParams } from "@remix-run/react";
import { $Enums } from "@prisma/client";

export interface CategoriesTableFiltersProps {
  query?: TAdminCategoriesLoaderData["query"];
}

export const AdminCategoriesTableFilters: FC<CategoriesTableFiltersProps> = ({
  query,
}) => {
  const [_, setSearchParams] = useSearchParams();

  const sortOptions: IndexFiltersProps["sortOptions"] = [
    { label: "ID", value: "id asc", directionLabel: "Oldest to newest" },
    { label: "ID", value: "id desc", directionLabel: "Newest to oldest" },
    { label: "Title", value: "title asc", directionLabel: "A-Z" },
    { label: "Title", value: "title desc", directionLabel: "Z-A" },
    {
      label: "Created",
      value: "createdAt asc",
      directionLabel: "Oldest to newest",
    },
    {
      label: "Created",
      value: "createdAt desc",
      directionLabel: "Newest to oldest",
    },
    {
      label: "Updated",
      value: "updatedAt asc",
      directionLabel: "Oldest to newest",
    },
    {
      label: "Updated",
      value: "updatedAt desc",
      directionLabel: "Newest to oldest",
    },
    {
      label: "Deleted",
      value: "deletedAt asc",
      directionLabel: "Oldest to newest",
    },
    {
      label: "Deleted",
      value: "deletedAt desc",
      directionLabel: "Newest to oldest",
    },
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

  const { mode, setMode } = useSetIndexFiltersMode();

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue("");
    setSearchParams((prev) => {
      prev.delete("q");
      prev.delete("role");
      prev.delete("accountStatus");
      prev.delete("skip");
      prev.delete("take");
      return prev;
    });
  }, [setSearchParams]);

  const appliedFilters: IndexFiltersProps["appliedFilters"] = [];

  return (
    <IndexFilters
      sortOptions={sortOptions}
      sortSelected={sortSelected}
      queryValue={queryValue}
      queryPlaceholder="Search categories"
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={() => handleFiltersQueryChange("")}
      onSort={setSortSelected}
      filters={[]}
      appliedFilters={appliedFilters}
      onClearAll={handleFiltersClearAll}
      mode={mode}
      setMode={setMode}
      tabs={[]}
      selected={0}
    />
  );
};
