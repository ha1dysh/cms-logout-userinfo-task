import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { productsPrimaryInfoFormValidator } from "~/admin/components/ProductsPrimaryInfoForm/ProductsPrimaryInfoForm.validator";

export async function adminProductsPrimaryAction({
  request,
  params,
}: ActionFunctionArgs) {
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

  const data = await productsPrimaryInfoFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { title } = data.data;

  const exist = await prisma.product.findFirst({ where: { title } });
  if (exist && exist.id !== product.id) {
    return validationError({
      fieldErrors: {
        email: "Product already exists",
      },
    });
  }

  await prisma.product.update({
    where: { id: product.id },
    data: {
      ...data.data,
      title
    },
  });

  return redirect(`${EAdminNavigation.products}/${product.id}`);
}
