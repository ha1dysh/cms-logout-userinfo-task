import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { adminUsersRoleAction } from "./users.role.action";
import { adminUsersDeleteAction } from "./users.delete.action";


type TActionTypes = 'changeRole' | 'delete';

export async function adminUsersMainAction({ request, params }: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.users);
  }

  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  });
  if (!user) {
    return redirect(EAdminNavigation.users);
  }

  const formData = await request.formData();
  const actionType = formData.get("actionType") as TActionTypes;

  switch (actionType) {
    case 'changeRole':
      return adminUsersRoleAction({ formData, id: user.id });
    case 'delete':
      return adminUsersDeleteAction(user);
    default:
      return redirect(EAdminNavigation.users);
  }
}
