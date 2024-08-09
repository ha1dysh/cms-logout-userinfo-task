import { BlockStack, Button, Card, InlineGrid, Text } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { EditIcon } from "@shopify/polaris-icons";
import { TCategoryDto } from "~/.server/admin/dto/category.dto";
import { NavLink } from "@remix-run/react";

export type PrimaryInfoCardProps = {
  category: TCategoryDto;
};

export function PrimaryInfoCard({ category }: PrimaryInfoCardProps) {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.categories}/${category.id}/primary`}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Title
          </Text>
          <Text as="p" variant="bodyMd">
            {category.title}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Description
          </Text>
          <Text as="p" variant="bodyMd">
            {category.description}
          </Text>
        </BlockStack>

        <BlockStack gap="200">
          {category.products?.map((product) => (
            <div key={product.id} style={{ display: "flex", gap: "10px" }}>
              <NavLink to={`${EAdminNavigation.products}/${product.id}`}>
                {product.title}
              </NavLink>
              <span style={{ color: "black", textDecoration: "none" }}>
                Price: {product.price} Quantity: {product.quantity}
              </span>
            </div>
          ))}
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
