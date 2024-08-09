import { useCallback } from "react";
import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { ValidatedForm } from "remix-validated-form";
import { adminProductsSingleLoader } from "~/.server/admin/loaders/products.single.loader";
import { adminProductsPrimaryAction } from "~/.server/admin/actions/products.primary.action";
import { ProductsPrimaryInfoForm } from "~/admin/components/ProductsPrimaryInfoForm/ProductsPrimaryInfoForm";
import { productsPrimaryInfoFormValidator } from "~/admin/components/ProductsPrimaryInfoForm/ProductsPrimaryInfoForm.validator";

export const loader = adminProductsSingleLoader;
export const action = adminProductsPrimaryAction;

export default function AdminUsersIdPrimary() {
  const { product } = useLoaderData<typeof loader>();

  const primaryAction = useCallback(
    () => <ValidatedSubmitButton text="save" variant="primary" />,
    []
  );

  return (
    <ValidatedForm validator={productsPrimaryInfoFormValidator} method="post">
      <Page
        title={`Edit Info: ${product.title}`}
        backAction={{
          url: `${EAdminNavigation.products}/${product.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <ProductsPrimaryInfoForm product={product} />
      </Page>
    </ValidatedForm>
  );
}
