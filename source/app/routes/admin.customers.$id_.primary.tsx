import { useCallback } from "react";
import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { ValidatedForm } from "remix-validated-form";
import { adminCustomersSingleLoader } from "~/.server/admin/loaders/customers.single.loader";
import { adminCustomersPrimaryAction } from "~/.server/admin/actions/customers.primary.action";
import { CustomersPrimaryInfoForm } from "~/admin/components/CustomersPrimaryInfoForm/CustomersPrimaryInfoForm";
import { customersPrimaryInfoFormValidator } from "~/admin/components/CustomersPrimaryInfoForm/CustomersPrimaryInfoForm.validator";

export const loader = adminCustomersSingleLoader;
export const action = adminCustomersPrimaryAction;

export default function AdminCustomersIdPrimary() {
  const { customer } = useLoaderData<typeof loader>();

  const primaryAction = useCallback(
    () => <ValidatedSubmitButton text="save" variant="primary" />,
    []
  );

  return (
    <ValidatedForm validator={customersPrimaryInfoFormValidator} method="post">
      <Page
        title={`Edit Info: ${customer.firstName} ${customer.lastName}`}
        backAction={{
          url: `${EAdminNavigation.customers}/${customer.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <CustomersPrimaryInfoForm customer={customer} />
      </Page>
    </ValidatedForm>
  );
}
