import { Customer } from "@prisma/client";
import { redirect } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export async function adminCustomersDeleteAction(customer: Customer) {
  if (customer.deletedAt) {
    return validationError({ fieldErrors: { error: 'Customer already deleted' } });
  }

  await prisma.customer.update({
    where: { id: customer.id },
    data: { deletedAt: new Date() },
  });
  return redirect(EAdminNavigation.customers);
}
