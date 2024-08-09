import { BlockStack, Layout } from "@shopify/polaris";
import { TProductDto } from "~/.server/admin/dto/product.dto";
import { PrimaryInfoCard } from "./PrimaryInfoCard";
import { ProductReview } from "./ProductReview";
import { ProductImages } from "./ProductImages";

export type ProductsSingleProps = {
  product: TProductDto;
};

export function ProductsSingle({ product }: ProductsSingleProps) {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard product={product} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <BlockStack gap="500">
          <ProductReview product={product} />
          <ProductImages product={product} />
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
}
