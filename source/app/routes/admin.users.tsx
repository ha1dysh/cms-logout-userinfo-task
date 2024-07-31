import {BaseLayout} from '~/admin/layouts/BaseLayout/BaseLayout';
import {Outlet, useLoaderData} from '@remix-run/react';
import { adminDashboardLoader } from '~/.server/admin/loaders/dashboard.loader';

export const loader = adminDashboardLoader

export default function AdminUsers() {
  const data = useLoaderData<typeof loader>();

  return (
    <BaseLayout user={data?.user}>
      <Outlet/>
    </BaseLayout>
  );
}
