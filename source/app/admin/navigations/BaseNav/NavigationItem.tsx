import { LinkProps, NavLink, useLocation } from "@remix-run/react";

export interface LinkItem extends LinkProps {
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  subLinks?: Omit<LinkItem, "subLinks">[];
}

type NavigationItemProps = {
  linkItem: LinkItem;
}

export function NavigationItem({ linkItem }: NavigationItemProps) {
  const { pathname } = useLocation();

  const isActive =
    typeof linkItem.to === "string"
      ? pathname.includes(linkItem.to)
      : pathname.includes(linkItem.to.pathname || "");

  return (
    <div>
      <li className="Polaris-Navigation__ListItem">
        <div className="Polaris-Navigation__ItemWrapper">
          <div
            className={`Polaris-Navigation__ItemInnerWrapper ${
              isActive && "Polaris-Navigation__ItemInnerWrapper--selected"
            }`}
          >
            <linkItem.icon className="Polaris-Navigation__Icon" />
            <NavLink
              to={linkItem.to}
              className="Polaris-Navigation__Item Polaris-Navigation__Text"
              style={{ fontWeight: "bold" }}
            >
              {linkItem.label}
            </NavLink>
          </div>
        </div>
      </li>
      {linkItem.subLinks && isActive && (
        <ul style={{ margin: "4px 0 4px -24px" }}>
          {linkItem.subLinks.map((item) => (
            <NavigationItem key={item.label} linkItem={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
