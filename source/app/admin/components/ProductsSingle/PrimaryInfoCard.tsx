import { BlockStack, Button, Card, InlineGrid, Text } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { EditIcon } from "@shopify/polaris-icons";
import { TProductDto } from "~/.server/admin/dto/product.dto";

export type PrimaryInfoCardProps = {
  product: TProductDto;
};

export function PrimaryInfoCard({ product }: PrimaryInfoCardProps) {

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.products}/${product.id}/primary`}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Full Name
          </Text>
          <Text as="p" variant="bodyMd">
            {product.title}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Price
          </Text>
          <Text as="p" variant="bodyMd">
            {product.price}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Quantity
          </Text>
          <Text as="p" variant="bodyMd">
            {product.quantity}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Description
          </Text>
          <Text as="p" variant="bodyMd">
            {product.description || "No description"}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Status
          </Text>
          <Text as="p" variant="bodyMd">
            {product.status}
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
