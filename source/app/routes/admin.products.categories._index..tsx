import { useLoaderData } from "@remix-run/react";
import { BlockStack, Card, Page, Text } from "@shopify/polaris";
import { PlusIcon } from "@shopify/polaris-icons";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { adminCategoriesLoader } from "~/.server/admin/loaders/categories.loader";
import { AdminCategoriesTable } from "~/admin/components/CategoryTable/CategoryTable";

export const loader = adminCategoriesLoader;

export default function AdminUsersIndex() {
  const data = useLoaderData<typeof loader>();

  return (
    <Page
      fullWidth
      title="Categories"
      primaryAction={{
        content: "Create category",
        icon: PlusIcon,
        accessibilityLabel: "Create category",
        url: EAdminNavigation.categoriesCreate,
      }}
    >
      <AdminCategoriesTable
        categories={data.categories}
        query={data.query}
        pagination={data.pagination}
      />

      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </BlockStack>
      </Card>
    </Page>
  );
}
