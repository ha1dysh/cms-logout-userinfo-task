import { ActionFunctionArgs, redirect } from "@remix-run/node";
import slugify from "slugify";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { productsNewFormValidator } from "~/admin/components/ProductsNewForm/ProductsNewForm.validator";
import { prisma } from "~/.server/shared/utils/prisma.util";

export async function adminProductsNewAction({ request }: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const data = await productsNewFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { title, categoryTitle, price, quantity, compareAtPrice,
    costPerItem, sku, barcode, status } = data.data;

  const category = await prisma.category.findFirst({ where: { title: categoryTitle } });
  if (!category) {
    return validationError({
      fieldErrors: {
        categoryTitle: "Category not found",
      },
    });
  }

  const exist = await prisma.product.findFirst({ where: { title } });
  if (exist) {
    return validationError({
      fieldErrors: {
        title: "Product already exists",
      },
    });
  }

  const newProduct = await prisma.product.create({
    data: {
      title,
      slug: slugify(title, { replacement: "-" }),
      categoryId: category.id,
      price,
      quantity,
      compareAtPrice,
      costPerItem,
      sku,
      barcode,
      status,
    },
  });

  return redirect(`${EAdminNavigation.products}/${newProduct.id}`);
}
