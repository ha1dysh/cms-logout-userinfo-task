import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { adminCustomersDeleteAction } from "./customers.delete.action";

type TActionTypes = 'updateAddress' | 'delete'

export async function adminCustomersMainAction({ request, params }: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  const customer = await prisma.customer.findFirst({
    where: { id: Number(id) },
  });
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  const formData = await request.formData();
  const actionType = formData.get("actionType") as TActionTypes;

  switch (actionType) {
    case 'updateAddress':
      return // TODO: crud address
    case 'delete':
      return adminCustomersDeleteAction(customer)
    default:
      return redirect(EAdminNavigation.customers);
  }
}
