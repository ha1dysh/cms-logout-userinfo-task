import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Button, InlineStack, Modal, Page, Text } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { useState } from "react";
import { adminCustomersSingleLoader } from "~/.server/admin/loaders/customers.single.loader";
import { CustomersSingle } from "~/admin/components/CustomersSingle/CustomersSingle";
import { adminCustomersMainAction } from "~/.server/admin/actions/customers.main.action";

export const loader = adminCustomersSingleLoader;
export const action = adminCustomersMainAction

export default function AdminCustomersSingle() {
  const { customer } = useLoaderData<typeof loader>();
  const dataAction = useActionData<typeof action>();
  const [modalActive, setModalActive] = useState(false);
  const isError = dataAction && 'error' in dataAction

  return (
    <Page
      title={`${customer.firstName} ${customer.lastName}`}
      backAction={{ url: EAdminNavigation.customers }}
      secondaryActions={[
        {
          content: "Delete customer",
          accessibilityLabel: "Delete customer",
          destructive: true,
          onAction: () => setModalActive((s) => !s),
        },
        {
          content: "Security",
          accessibilityLabel: "Security",
          url: `${EAdminNavigation.customers}/${customer.id}/security`,
        },
      ]}
    >
      <CustomersSingle customer={customer} />
      <Modal
        open={modalActive}
        onClose={() => setModalActive((s) => !s)}
        title="You sure you want to delete this customer?"
      >
        <Modal.Section>
          {isError && (
            <Text as="p" variant="headingMd" tone="critical">
              {dataAction?.error?.message}
            </Text>
          )}
          <Form action={`${EAdminNavigation.customers}/${customer?.id}`} method="post">
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
