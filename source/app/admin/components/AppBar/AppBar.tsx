import { User } from '@prisma/client';
import { useFetcher } from '@remix-run/react';
import {TopBar, TopBarProps} from '@shopify/polaris';
import {FC, useCallback, useState} from 'react';

export interface AppBarProps {
  onNavigationToggle: TopBarProps['onNavigationToggle'];
}

export const AppBar: FC<AppBarProps & {user: User}> = ({onNavigationToggle, user}) => {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const fetcher = useFetcher()

  const toggleUserMenuActive = useCallback(() => {
    setUserMenuActive((userMenuActive) => !userMenuActive);
  }, []);

  const userMenuActions = [
    { items: [{ content: 'Log out', onAction: () => {
      fetcher.submit(null, { method: 'POST', action: '/admin/dashboard' });
    } }] },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={user.fullName || 'Empty name'}
      detail={'storeName'}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={onNavigationToggle}
    />
  );
};
