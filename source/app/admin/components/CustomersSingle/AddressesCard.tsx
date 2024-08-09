import { BlockStack, Button, Card, FormLayout, InlineGrid, InlineStack, Modal, Text } from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { ValidatedTextField } from "~/admin/ui/ValidatedTextField/ValidatedTextField";
import { TAddressDto } from "~/.server/admin/dto/address.dto";
import { usersRoleFormValidator } from "../UserSingle/UsersRoleForm.validator";
import { AddressFormValidator } from "../AddressForm/AddressForm.validator";

export type AddressesCardProps = {
  customerAddress: TAddressDto
};

export function AddressCard({ customerAddress }: AddressesCardProps) {
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
            Address
          </Text>
          <Button
            onClick={toggleActive}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {customerAddress.country}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress.city}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress.address}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress.apartment}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress.postalCode}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress.company}
        </Text>
        <Text as="p" variant="bodyMd">
          {customerAddress.phone}
        </Text>
      </BlockStack>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Change address"
      >
        <ValidatedForm
          validator={AddressFormValidator}
          method="post"
          onSubmit={toggleActive}
        >
          <Modal.Section>
            <FormLayout>
              <input type="hidden" name="actionType" value="changeAddress" />
              <input type="hidden" name="addressId" value={customerAddress.id} />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.country}
                name="country"
                label="Country"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.firstName}
                name="firstName"
                label="First Name"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.lastName}
                name="lastName"
                label="Last Name"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.city}
                name="city"
                label="City"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.address}
                name="address"
                label="Address"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.apartment}
                name="apartment"
                label="Apartment"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={String(customerAddress.postalCode)}
                name="postalCode"
                label="Postal code"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.company}
                name="company"
                label="Company"
              />
              <ValidatedTextField
                autoComplete="off"
                defaultValue={customerAddress.phone}
                name="phone"
                label="Phone"
              />
            </FormLayout>
          </Modal.Section>
          <Modal.Section>
            <InlineStack direction="row-reverse" align="end" gap="200">
              <ValidatedSubmitButton text={"Save"} variant="primary" />
              <Button onClick={toggleActive}>Cancel</Button>
            </InlineStack>
          </Modal.Section>
        </ValidatedForm>
      </Modal>
    </Card>
  );
}
