import {
  BlockStack,
  Button,
  Card,
  FormLayout,
  InlineGrid,
  InlineStack,
  Modal,
  SelectProps,
  Text,
} from "@shopify/polaris";
import { EditIcon } from "@shopify/polaris-icons";
import { useCallback, useMemo, useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { $Enums } from "@prisma/client";
import { ValidatedSelect } from "~/admin/ui/ValidatedSelect/ValidatedSelect";
import { usersRoleFormValidator } from "~/admin/components/UserSingle/UsersRoleForm.validator";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { TCategoryDto } from "~/.server/admin/dto/category.dto";

export type RoleCardProps = {
  category: TCategoryDto;
};

export function RoleCard({ category }: RoleCardProps) {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const roleOptions: SelectProps["options"] = useMemo(
    () => [
      {
        label: "Select role",
        value: "",
      },
      {
        label: "Admin",
        value: $Enums.AdminRole.ADMIN,
      },
      {
        label: "Staff",
        value: $Enums.AdminRole.STUFF,
      },
    ],
    []
  );

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Role
          </Text>
          <Button
            onClick={toggleActive}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        {/* <Text as="p" variant="bodyMd">
          {role}
        </Text> */}
      </BlockStack>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Change role"
      >
        <ValidatedForm
          validator={usersRoleFormValidator}
          method="post"
          onSubmit={toggleActive}
        >
          <Modal.Section>
            <FormLayout>
              <input type="hidden" name="actionType" value="changeRole" />
              <ValidatedSelect
                label={null}
                name="role"
                options={roleOptions}
                // defaultValue={role}
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
