import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Button, InlineStack, Modal, Page, Text } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { UsersSingle } from "~/admin/components/UserSingle/UserSingle";
import { adminUsersSingleLoader } from "~/.server/admin/loaders/users.single.loader";
import { adminUsersMainAction } from "~/.server/admin/actions/users.main.action";
import { useState } from "react";

export const loader = adminUsersSingleLoader;
export const action = adminUsersMainAction;

export default function AdminUsersSingle() {
  const { user } = useLoaderData<typeof loader>();
  const dataAction = useActionData<typeof action>();
  const [modalActive, setModalActive] = useState(false);
  const isError = dataAction && 'error' in dataAction

  return (
    <Page
      title={user.fullName || ""}
      backAction={{ url: EAdminNavigation.users }}
      secondaryActions={[
        {
          content: "Delete user",
          accessibilityLabel: "Delete user",
          destructive: true,
          onAction: () => setModalActive((s) => !s),
        },
        {
          content: "Security",
          accessibilityLabel: "Security",
          url: `${EAdminNavigation.users}/${user.id}/security`,
        },
      ]}
    >
      <UsersSingle user={user} />
      <Modal
        open={modalActive}
        onClose={() => setModalActive((s) => !s)}
        title="You sure you want to delete this user?"
      >
        <Modal.Section>
          {isError && (
            <Text as="p" variant="headingMd" tone="critical">
              {dataAction?.error?.message}
            </Text>
          )}
          <Form action={`${EAdminNavigation.users}/${user.id}`} method="post">
            <input type="hidden" name="actionType" value="delete" />
            <InlineStack gap="200" align="end">
              <Button
                variant="secondary"
                onClick={() => setModalActive((s) => !s)}
              >
                No
              </Button>
              <Button variant="primary" submit>
                Yes
              </Button>
            </InlineStack>
          </Form>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
