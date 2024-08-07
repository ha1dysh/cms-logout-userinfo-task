import { Customer } from "@prisma/client";
import { json, redirect } from "@remix-run/react";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export async function adminCustomersDeleteAction(customer: Customer) {
  if (customer.deletedAt) {
    return json({ error: { message: "Customer already deleted" } });
  }

  await prisma.customer.update({
    where: { id: customer.id },
    data: { deletedAt: new Date() },
  });
  return redirect(EAdminNavigation.customers);
}
