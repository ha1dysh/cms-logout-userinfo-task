import { BlockStack, Card, FormLayout, Text } from "@shopify/polaris";
import { TCustomerDto } from "~/.server/admin/dto/customer.dto";
import { ValidatedTextField } from "~/admin/ui/ValidatedTextField/ValidatedTextField";



export function CustomersPrimaryInfoForm({
  customer,
}: {
  customer: TCustomerDto;
}) {

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label="First Name"
              type="text"
              name="firstName"
              autoComplete="given-name"
              defaultValue={customer.firstName}
            />
            <ValidatedTextField
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="family-name"
              defaultValue={customer.lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={customer.email}
          />
          <ValidatedTextField
            label="Phone"
            type="text"
            name="phone"
            autoComplete="phone"
            defaultValue={customer.phone || ''}
          />
          <ValidatedTextField
            label="Note"
            type="text"
            name="note"
            autoComplete="note"
            defaultValue={customer.note || ''}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
}
