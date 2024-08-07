import { BlockStack, Button, Card, InlineGrid, Text } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { TCustomerDto } from "~/.server/admin/dto/customer.dto";

export type AddressesCardProps = {
  customer: TCustomerDto;
};

export function AddressCard({ customer: { customerAddress } }: AddressesCardProps) {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  if (!customerAddress) {
    return null;
  }

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Addresses
          </Text>
          <Button
            onClick={toggleActive}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {customerAddress[0]?.country}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress[0]?.city}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress[0]?.address}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress[0]?.apartment}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress[0]?.postalCode}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress[0]?.company}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress[0]?.phone}
        </Text>
      </BlockStack>
    </Card>
  );
}
