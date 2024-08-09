import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { categoryMapper } from "../mappers/category.mapper";

export async function adminCategoriesSingleLoader({
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

  const category = await prisma.category.findFirst({
    where: { id: Number(id) },
    include: {
      products: true,
    }
  });

  if (!category) {
    return redirect(EAdminNavigation.users);
  }

  return json({ category: categoryMapper(category) });
}
