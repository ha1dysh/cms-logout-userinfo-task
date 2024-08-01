import { BlockStack, Layout } from "@shopify/polaris";
import { TUserDto } from "~/.server/admin/dto/user.dto";
import { PrimaryInfoCard } from "~/admin/components/UserSingle/PrimaryInfoCard";
import { RoleCard } from "~/admin/components/UserSingle/RoleCard";

export type UsersSingleProps = {
  user: TUserDto;
};

export function UsersSingle({ user }: UsersSingleProps) {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard user={user} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <RoleCard user={user} />
      </Layout.Section>
    </Layout>
  );
}
