import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { joinFirstName } from "~/admin/utils/user.util";
import { usersPrimaryInfoFormValidator } from "~/admin/components/UsersPrimaryInfoForm/UsersPrimaryInfoForm.validator";

export async function adminUsersPrimaryAction({
  request,
  params,
}: ActionFunctionArgs) {
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

  const data = await usersPrimaryInfoFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { email, lastName, firstName } = data.data;

  const exist = await prisma.user.findFirst({ where: { email } });
  if (exist && exist.id !== user.id) {
    return validationError({
      fieldErrors: {
        email: "User already exists",
      },
    });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      email,
      fullName: joinFirstName(firstName, lastName),
    },
  });

  return redirect(`${EAdminNavigation.users}/${user.id}`);
}
