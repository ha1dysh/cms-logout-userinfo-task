import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export const adminUsersDeleteAction = async ({ params }: ActionFunctionArgs) => {
  const id = Number(params.id);
  await prisma.user.delete({ where: { id } });
  return redirect(EAdminNavigation.users);
};
