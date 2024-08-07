import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/utils/prisma.util';
import { hashPassword } from '~/.server/shared/utils/auth.util';
import { customersNewFormValidator } from '~/admin/components/CustomersNewForm/CustomersNewForm.validator';

export async function adminCustomersNewAction({request}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const data = await customersNewFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { firstName, lastName, email, password, phone, note } = data.data;

  const exist = await prisma.customer.findFirst({where: {email}});
  if (exist) {
    return validationError({
      fieldErrors: {
        email: 'Customer already exists'
      }
    });
  }

  const newCustomer = await prisma.customer.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      note,
      password: await hashPassword(password),
    },
  });

  return redirect(`${EAdminNavigation.customers}/${newCustomer.id}`);
}
