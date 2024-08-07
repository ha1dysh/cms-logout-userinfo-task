import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { customersPrimaryInfoFormValidator } from "~/admin/components/CustomersPrimaryInfoForm/CustomersPrimaryInfoForm.validator";

export async function adminCustomersPrimaryAction({
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

  const data = await customersPrimaryInfoFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { email } = data.data;

  const exist = await prisma.customer.findFirst({ where: { email } });
  if (exist && exist.id !== customer.id) {
    return validationError({
      fieldErrors: { email: "Customer already exists" },
    });
  }

  await prisma.customer.update({
    where: { id: customer.id },
    data: {
      ...data.data,
    },
  });

  return redirect(`${EAdminNavigation.customers}/${customer.id}`);
}
