import { NavigationItem } from "./NavigationItem";
import type { LinkItem } from "~/admin/layouts/BaseLayout/BaseLayout";

export function NavigationSection({ linkItems}: { linkItems: LinkItem[] }) {
  return (
    <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable">
      <ul className="Polaris-Navigation__Section">
        {linkItems.map((el) => (
          <NavigationItem key={el.label} linkItem={el} />
        ))}
      </ul>
    </div>
  );
}
