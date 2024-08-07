import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { customerMapper } from "../mappers/customer.mapper";

export async function adminCustomersSingleLoader({
  request,
  params,
}: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  const customer = await prisma.customer.findFirst({
    where: { id: Number(id) },
    include: {
      customerAddress: true,
    }
  });

  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  return json({ customer: customerMapper(customer) });
}
