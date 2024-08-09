import { BlockStack, Card, Layout } from '@shopify/polaris';
import { PrimaryInfoCard } from '~/admin/components/ProductsNewForm/PrimaryInfoCard';

export const ProductsNewForm = () => {

  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <Card>Category</Card>
      </Layout.Section>
    </Layout>
  );
};
