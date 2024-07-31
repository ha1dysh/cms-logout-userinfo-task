import {Frame} from '@shopify/polaris';
import {FC, PropsWithChildren, useCallback, useState} from 'react';
import {BaseNav} from '~/admin/navigations/BaseNav/BaseNav';
import {AppBar} from '~/admin/components/AppBar/AppBar';
import { User } from '@prisma/client';


export const BaseLayout: FC<PropsWithChildren & {user: User}> = ({children, user}) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const logo = {
    width: 86,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    contextualSaveBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    accessibilityLabel: 'Shopify',
  };

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  return (
    <Frame
      logo={logo}
      topBar={<AppBar onNavigationToggle={toggleMobileNavigationActive} user={user} />}
      navigation={<BaseNav/>}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
};
