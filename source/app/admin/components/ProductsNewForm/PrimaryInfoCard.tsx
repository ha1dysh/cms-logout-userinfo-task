import { BlockStack, Card, FormLayout, Text } from "@shopify/polaris";
import { useMemo } from "react";
import { ValidatedSelect } from "~/admin/ui/ValidatedSelect/ValidatedSelect";
import { ValidatedTextField } from "~/admin/ui/ValidatedTextField/ValidatedTextField";

export const PrimaryInfoCard = () => {

  const statusOptions = useMemo(
    () => [
      {
        label: "Select status",
        value: "",
      },
      {
        label: "ACTIVE",
        value: 'ACTIVE',
      },
      {
        label: "DRAFT",
        value: 'DRAFT',
      },
    ],
    []
  );

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <ValidatedTextField
            label="Title*"
            type="text"
            name="title"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Description"
            type="text"
            name="description"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Price*"
            type="number"
            name="price"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Quantity*"
            type="number"
            name="quantity"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Compare At Price"
            type="number"
            name="compareAtPrice"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Cost Per Item"
            type="number"
            name="costPerItem"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Sku"
            type="text"
            name="sku"
            autoComplete="off"
          />
          <ValidatedTextField
            label="Barcode"
            type="text"
            name="barcode"
            autoComplete="off"
          />
          <ValidatedSelect
            label={null}
            name="status"
            options={statusOptions}
            defaultValue={""}
          />
          <ValidatedTextField
            label="Category"
            type="text"
            name="categoryTitle"
            autoComplete="off"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
