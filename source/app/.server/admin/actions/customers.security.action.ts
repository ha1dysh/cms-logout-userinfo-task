import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { hashPassword } from "~/.server/shared/utils/auth.util";
import { customersSecurityFormValidator } from "~/admin/components/CustomersSecurityForm/CustomersSecurityForm.validator";

export async function adminCustomersSecurityAction({
  request,
  params,
}: ActionFunctionArgs) {
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

  const data = await customersSecurityFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { password } = data.data;

  await prisma.customer.update({
    where: { id: customer.id },
    data: {
      password: await hashPassword(password),
    },
  });

  return redirect(`${EAdminNavigation.customers}/${customer.id}`);
}
