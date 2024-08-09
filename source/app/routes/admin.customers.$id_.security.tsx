import { useCallback } from "react";
import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { ValidatedForm } from "remix-validated-form";
import { adminCustomersSecurityAction } from "~/.server/admin/actions/customers.security.action";
import { customersSecurityFormValidator } from "~/admin/components/CustomersSecurityForm/CustomersSecurityForm.validator";
import { CustomersSecurityForm } from "~/admin/components/CustomersSecurityForm/CustomersSecurityForm";
import { adminCustomersSingleLoader } from "~/.server/admin/loaders/customers.single.loader";

export const loader = adminCustomersSingleLoader;
export const action = adminCustomersSecurityAction;

export default function AdminUsersIdSecurity() {
  const { customer } = useLoaderData<typeof loader>();

  const primaryAction = useCallback(
    () => <ValidatedSubmitButton text="save" variant="primary" />,
    []
  );

  return (
    <ValidatedForm validator={customersSecurityFormValidator} method="post">
      <Page
        title={`Edit Security: ${customer.firstName} ${customer.lastName}`}
        backAction={{
          url: `${EAdminNavigation.customers}/${customer.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <CustomersSecurityForm />
      </Page>
    </ValidatedForm>
  );
}
