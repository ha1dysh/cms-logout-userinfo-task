import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { useState } from "react";
import { UsersDeleteModal } from "~/admin/components/UserSingle/deleteModal";
import { adminProductsSingleLoader } from "~/.server/admin/loaders/products.single.loader";
import { ProductsSingle } from "~/admin/components/ProductsSingle/ProductsSingle";
import { adminProductsMainAction } from "~/.server/admin/actions/products.main.action";

export const loader = adminProductsSingleLoader;
export const action = adminProductsMainAction;

export default function AdminUsersSingle() {
  const { product } = useLoaderData<typeof loader>();
  const [modalActive, setModalActive] = useState(false);

  return (
    <Page
      title={product.title}
      backAction={{ url: EAdminNavigation.products }}
      secondaryActions={[
        {
          content: "Delete product",
          accessibilityLabel: "Delete product",
          destructive: true,
          onAction: () => setModalActive((s) => !s),
        },
      ]}
    >
      <ProductsSingle product={product} />
      <UsersDeleteModal
        id={product.id}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
    </Page>
  );
}
