import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { useState } from "react";
import { adminCustomersSingleLoader } from "~/.server/admin/loaders/customers.single.loader";
import { CustomersSingle } from "~/admin/components/CustomersSingle/CustomersSingle";
import { adminCustomersMainAction } from "~/.server/admin/actions/customers.main.action";
import { CustomerDeleteModal } from "~/admin/components/CustomersSingle/deleteModal";

export const loader = adminCustomersSingleLoader;
export const action = adminCustomersMainAction

export default function AdminCustomersSingle() {
  const { customer } = useLoaderData<typeof loader>();
  const [modalActive, setModalActive] = useState(false);

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
      <CustomerDeleteModal
        id={customer.id}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
    </Page>
  );
}
