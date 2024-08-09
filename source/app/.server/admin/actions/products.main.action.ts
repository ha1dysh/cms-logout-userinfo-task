import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { productFileUploadAction } from "./products.uploadImg.action";


export async function adminProductsMainAction({ request, params }: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.products);
  }

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });
  if (!product) {
    return redirect(EAdminNavigation.products);
  }

  return productFileUploadAction({ request, id: product.id });
}
