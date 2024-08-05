import { HomeIcon, OrderIcon, PersonIcon, ProductIcon, WorkIcon } from "@shopify/polaris-icons";
import { NavLink } from "@remix-run/react";
import { useLocation } from "react-router";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";

type LinkItem = {
  label: string;
  url: typeof EAdminNavigation[keyof typeof EAdminNavigation];
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};
const linkItems: LinkItem[] = [
  { label: "Home", url: EAdminNavigation.dashboard, icon: HomeIcon },
  { label: "Users", url: EAdminNavigation.users, icon: PersonIcon },
  { label: "Customers", url: EAdminNavigation.customers, icon: WorkIcon },
  { label: "Products", url: EAdminNavigation.products, icon: ProductIcon },
  { label: "Orders", url: EAdminNavigation.orders, icon: OrderIcon },
];

export function BaseNav() {
  return (
    <nav className="Polaris-Navigation">
      <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable">
        <ul className="Polaris-Navigation__Section">
          {linkItems.map((el) => (
            <NavItem key={el.label} linkItem={el} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

function NavItem({ linkItem }: { linkItem: LinkItem }) {
  const { pathname } = useLocation();
  const isActive = pathname === linkItem.url
    ? "Polaris-Navigation__ItemInnerWrapper--selected"
    : "";

  return (
    <li className="Polaris-Navigation__ListItem">
      <div className="Polaris-Navigation__ItemWrapper">
        <div className={`Polaris-Navigation__ItemInnerWrapper ${isActive}`}>
          <linkItem.icon className="Polaris-Navigation__Icon" />
          <NavLink
            to={linkItem.url}
            className="Polaris-Navigation__Item Polaris-Navigation__Text"
            style={{ fontWeight: "bold" }}
          >
            {linkItem.label}
          </NavLink>
        </div>
      </div>
    </li>
  );
}
