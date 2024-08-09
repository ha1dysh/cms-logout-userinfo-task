import { BlockStack, Card, FormLayout, Text } from "@shopify/polaris";
import { ValidatedTextField } from "~/admin/ui/ValidatedTextField/ValidatedTextField";
import { TProductDto } from "~/.server/admin/dto/product.dto";
import { ValidatedSelect } from "~/admin/ui/ValidatedSelect/ValidatedSelect";
import { useMemo } from "react";


export function ProductsPrimaryInfoForm({ product }: {product:TProductDto}) {
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
            defaultValue={product.title}
          />
          <ValidatedTextField
            label="Description"
            type="text"
            name="description"
            autoComplete="off"
            defaultValue={product.description || ''}
          />
          <ValidatedTextField
            label="Price*"
            type="number"
            name="price"
            autoComplete="off"
            defaultValue={String(product.price)}
          />
          <ValidatedTextField
            label="Quantity*"
            type="number"
            name="quantity"
            autoComplete="off"
            defaultValue={String(product.quantity)}
          />
          <ValidatedTextField
            label="Compare At Price"
            type="number"
            name="compareAtPrice"
            autoComplete="off"
            defaultValue={String(product.compareAtPrice || '')}
          />
          <ValidatedTextField
            label="Cost Per Item"
            type="number"
            name="costPerItem"
            autoComplete="off"
            defaultValue={String(product.costPerItem  || '')}
          />
          <ValidatedTextField
            label="Sku"
            type="text"
            name="sku"
            autoComplete="off"
            defaultValue={product.sku || ''}
          />
          <ValidatedTextField
            label="Barcode"
            type="text"
            name="barcode"
            autoComplete="off"
            defaultValue={product.barcode || ''}
          />
          <ValidatedSelect
            label={null}
            name="status"
            options={statusOptions}
            defaultValue={product.status || ''}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
}
