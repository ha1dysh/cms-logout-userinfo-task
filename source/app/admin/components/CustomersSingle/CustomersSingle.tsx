import { BlockStack, Layout } from "@shopify/polaris";
import { TCustomerDto } from "~/.server/admin/dto/customer.dto";
import { PrimaryInfoCard } from "./PrimaryInfoCard";
import { AddressCard } from "./AddressesCard";

export type CustomersSingleProps = {
  customer: TCustomerDto;
};

export function CustomersSingle({ customer }: CustomersSingleProps) {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard customer={customer} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        {customer?.customerAddress?.map((address) => (
          <AddressCard key={address.id} customerAddress={address} />
        ))}
      </Layout.Section>
    </Layout>
  );
}
