import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { userMapper } from "~/.server/admin/mappers/user.mapper";
import { prisma } from "~/.server/shared/utils/prisma.util";

export async function adminUsersSingleLoader({
  request,
  params,
}: LoaderFunctionArgs) {
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

  return json({ user: userMapper(user) });
}
