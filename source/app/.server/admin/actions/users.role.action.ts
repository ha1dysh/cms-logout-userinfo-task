import { $Enums } from "@prisma/client";
import { redirect } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { usersRoleFormValidator } from "~/admin/components/UserSingle/UsersRoleForm.validator";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

type TAdminUsersRoleAction = {
  formData: FormData;
  id: number;
}

export async function adminUsersRoleAction({formData, id}: TAdminUsersRoleAction) {
  const data = await usersRoleFormValidator.validate(formData);
  if (data.error) {
    return validationError(data.error);
  }

  const { role } = data.data;

  await prisma.user.update({
    where: { id },
    data: {
      role: role as $Enums.AdminRole,
    },
  });

  return redirect(`${EAdminNavigation.users}/${id}`);
}
