import { User } from "@prisma/client";
import { json, redirect } from "@remix-run/react";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

export async function adminUsersDeleteAction(user: User) {
  if (user.deletedAt) {
    return json({ error: { message: "User already deleted" } });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { deletedAt: new Date() },
  });
  return redirect(EAdminNavigation.users);
}
