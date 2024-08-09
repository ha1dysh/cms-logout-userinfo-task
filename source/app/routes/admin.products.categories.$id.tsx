import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { useState } from "react";
import { adminProductsMainAction } from "~/.server/admin/actions/products.main.action";
import { adminCategoriesSingleLoader } from "~/.server/admin/loaders/categories.single.loader";
import { CategoriesSingle } from "~/admin/components/CategorySingle/CategorySingle";

export const loader = adminCategoriesSingleLoader;
export const action = adminProductsMainAction;

export default function AdminCategoriesSingle() {
  const { category } = useLoaderData<typeof loader>();
  const [modalActive, setModalActive] = useState(false);

  return (
    <Page
      title={category.title}
      backAction={{ url: EAdminNavigation.categories }}
      secondaryActions={[
        {
          content: "Delete category",
          accessibilityLabel: "Delete category",
          destructive: true,
          onAction: () => setModalActive((s) => !s),
        },
      ]}
    >
      <CategoriesSingle category={category} />
      {/* <UsersDeleteModal
        id={product.id}
        modalActive={modalActive}
        setModalActive={setModalActive}
      /> */}
    </Page>
  );
}
