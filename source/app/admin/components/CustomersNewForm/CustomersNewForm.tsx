import { BlockStack, Layout } from "@shopify/polaris";
import { PrimaryInfoCard } from "./PrimaryInfoCard";
import { SecurityCard } from "./SecurityCard";

export const CustomersNewForm = () => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard />
          <SecurityCard />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        {/* <RoleCard /> */}
      </Layout.Section>
    </Layout>
  );
};
