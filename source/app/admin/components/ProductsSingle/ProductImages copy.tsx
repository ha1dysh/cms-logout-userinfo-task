import {
  BlockStack,
  Button,
  Card,
  FormLayout,
  InlineGrid,
  InlineStack,
  Modal,
  Text,
} from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { usersRoleFormValidator } from "~/admin/components/UserSingle/UsersRoleForm.validator";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { TProductDto } from "~/.server/admin/dto/product.dto";

export type RoleCardProps = {
  product: TProductDto;
};

export function ProductImages({ product }: RoleCardProps) {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Product Images
          </Text>
          <Button
            onClick={toggleActive}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        {product?.productImages?.map((image) => (
          <img
            src={image.image}
            alt="product image"
            key={image.id}
            style={{ width: "200px", height: "200px", borderRadius: "8px" }}
          />
        ))}
      </BlockStack>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Edit review"
      >
        <ValidatedForm
          validator={usersRoleFormValidator}
          method="post"
          onSubmit={toggleActive}
        >
          <Modal.Section>
            <FormLayout>
              <input type="hidden" name="actionType" value="changeRole" />
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
