import { BaseLayout } from "~/admin/layouts/BaseLayout/BaseLayout";
import { Outlet, useLoaderData } from "@remix-run/react";
import { adminDashboardLoader } from "~/.server/admin/loaders/dashboard.loader";
import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";

export const loader = adminDashboardLoader;

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/admin/auth/login" });
};

export default function AdminDashboard() {
  const data = useLoaderData<typeof loader>();

  return (
    <BaseLayout user={data.user}>
      <Outlet />
    </BaseLayout>
  );
}
