import { BlockStack, Layout } from "@shopify/polaris";
import { TCategoryDto } from "~/.server/admin/dto/category.dto";
import { RoleCard } from "./RoleCard";
import { PrimaryInfoCard } from "./PrimaryInfoCard";

export type CategoriesSingleProps = {
  category: TCategoryDto;
};

export function CategoriesSingle({ category }: CategoriesSingleProps) {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard category={category} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <RoleCard category={category} />
      </Layout.Section>
    </Layout>
  );
}
