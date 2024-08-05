import {
  BlockStack,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Modal,
  Text,
} from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { EditIcon } from "@shopify/polaris-icons";
import { TUserDto } from "~/.server/admin/dto/user.dto";
import { Form } from "@remix-run/react";
import { useState, useCallback } from "react";

export type PrimaryInfoCardProps = {
  user: TUserDto;
};

export function PrimaryInfoCard({ user }: PrimaryInfoCardProps) {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button variant="primary" tone="critical" onClick={handleChange}>
      Delete
    </Button>
  );

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.users}/${user.id}/primary`}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Full Name
          </Text>
          <Text as="p" variant="bodyMd">
            {user.fullName}
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingXs" fontWeight="medium">
            Email
          </Text>
          <Text as="p" variant="bodyMd">
            {user.email}
          </Text>
        </BlockStack>
      </BlockStack>

      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="You sure you want to delete this user?"
      >
        <Modal.Section>
          <Form
            action={`${EAdminNavigation.users}/${user.id}/delete`}
            method="post"
          >
            <InlineStack gap="200" align="end">
              <Button variant="secondary" onClick={handleChange}>No</Button>
              <Button variant="primary" submit>Yes</Button>
            </InlineStack>
          </Form>
        </Modal.Section>
      </Modal>
    </Card>
  );
}
