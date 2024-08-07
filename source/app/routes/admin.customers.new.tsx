import {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import { adminCustomersNewAction } from '~/.server/admin/actions/customers.new.action';
import { customersNewFormValidator } from '~/admin/components/CustomersNewForm/CustomersNewForm.validator';
import { CustomersNewForm } from '~/admin/components/CustomersNewForm/CustomersNewForm';

export const action = adminCustomersNewAction;

export default function AdminUsersNew() {
  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={customersNewFormValidator} method="post">
      <Page
        title="Create new customer"
        backAction={{
          url: EAdminNavigation.customers
        }}
        primaryAction={primaryAction()}
      >
        <CustomersNewForm/>
      </Page>
    </ValidatedForm>
  );
}
