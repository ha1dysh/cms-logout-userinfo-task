import { Badge } from "@shopify/polaris";
import { TUserDto } from "~/.server/admin/dto/user.dto";
import { $Enums } from "@prisma/client";

export type UserRoleBadgeProps = Pick<TUserDto, "role">;

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <Badge
      size="small"
      tone={role === $Enums.AdminRole.ADMIN ? "success" : undefined}
    >
      {role}
    </Badge>
  );
}
