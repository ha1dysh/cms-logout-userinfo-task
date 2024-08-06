import { NavLink, useLocation } from "@remix-run/react";
import type { LinkItem } from "~/admin/layouts/BaseLayout/BaseLayout";

export function NavigationItem({ linkItem }: { linkItem: LinkItem }) {
  const { pathname } = useLocation();

  const isActive = typeof linkItem.to === "string"
    ? pathname.includes(linkItem.to)
    : pathname.includes(linkItem.to.pathname || "");

  return (
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
  );
}
