import { LinkProps } from "@remix-run/react"
import { Frame } from "@shopify/polaris";
import { FC, PropsWithChildren, useCallback, useState } from "react";
import { HomeIcon, OrderIcon, PersonIcon, ProductIcon, WorkIcon } from "@shopify/polaris-icons";
import { AppBar } from "~/admin/components/AppBar/AppBar";
import { TUserDto } from "~/.server/admin/dto/user.dto";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { Navigation } from "~/admin/navigations/BaseNav/Navigation";
import { NavigationSection } from "~/admin/navigations/BaseNav/NavigationSection";


export interface LinkItem extends LinkProps {
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export type BaseLayoutProps = PropsWithChildren<{
  user: TUserDto;
}>;

export const BaseLayout: FC<BaseLayoutProps> = ({ children, user }) => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const logo = {
    width: 86,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    contextualSaveBarSource:
      "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
    accessibilityLabel: "Shopify",
  };
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const linkItems: LinkItem[] = [
    { label: "Home", to: EAdminNavigation.dashboard, icon: HomeIcon },
    { label: "Users", to: EAdminNavigation.users, icon: PersonIcon },
    { label: "Customers", to: EAdminNavigation.customers, icon: WorkIcon },
    { label: "Products", to: EAdminNavigation.products, icon: ProductIcon },
    { label: "Orders", to: EAdminNavigation.orders, icon: OrderIcon },
  ];

  const PolarisNavigation = (
    <Navigation>
      <NavigationSection linkItems={linkItems} />
    </Navigation>
  );

  return (
    <Frame
      logo={logo}
      topBar={
        <AppBar user={user} onNavigationToggle={toggleMobileNavigationActive} />
      }
      navigation={PolarisNavigation}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
};
