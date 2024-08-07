import { useLoaderData } from "@remix-run/react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { UsersSingle } from "~/admin/components/UserSingle/UserSingle";
import { adminUsersSingleLoader } from "~/.server/admin/loaders/users.single.loader";
import { adminUsersMainAction } from "~/.server/admin/actions/users.main.action";
import { useState } from "react";
import { UsersDeleteModal } from "~/admin/components/UserSingle/deleteModal";

export const loader = adminUsersSingleLoader;
export const action = adminUsersMainAction;

export default function AdminUsersSingle() {
  const { user } = useLoaderData<typeof loader>();
  const [modalActive, setModalActive] = useState(false);

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
      <UsersDeleteModal id={user.id} modalActive={modalActive} setModalActive={setModalActive} />
    </Page>
  );
}
