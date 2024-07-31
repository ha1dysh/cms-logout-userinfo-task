import { json, useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Box,
  Button,
  Card,
  Form,
  Layout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  return json({ user });
}

export default function AdminUsersNew() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <Page
      title="Users"
      backAction={{
        url: EAdminNavigation.users,
      }}
      actionGroups={[
        {
          title: "Copy",
          onClick: (openActions) => {
            alert("Copy action");
            openActions();
          },
          actions: [{ content: "Copy to clipboard" }],
        },
        {
          title: "Promote",
          disabled: true,
          actions: [{ content: "Share on Facebook" }],
        },
        {
          title: "More actions",
          actions: [
            { content: "Duplicate" },
            { content: "Print" },
            { content: "Unarchive" },
            { content: "Cancel order" },
          ],
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card roundedAbove="sm">
            <Text as="h1" variant="headingLg" fontWeight="bold">
              User info:
            </Text>
            <Box paddingBlock="200">
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm" fontWeight="medium">
                  Full name
                </Text>
                <Text as="p" variant="bodyMd">
                  {user?.fullName}
                </Text>
              </BlockStack>
            </Box>
            <Box paddingBlockStart="200">
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm" fontWeight="medium">
                  Email
                </Text>
                <Text as="p" variant="bodyMd">
                  {user?.email}
                </Text>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card roundedAbove="sm">
            <Text as="h1" variant="headingSm" fontWeight="bold">
              User role
            </Text>
            <Text as="h3" variant="headingSm" fontWeight="medium">
              {user?.role}
            </Text>
          </Card>

          <Card roundedAbove="sm">
            <Text as="h1" variant="headingSm" fontWeight="bold">
              Security
            </Text>
            <Form onSubmit={() => {}}>
              <TextField
                label="change password"
                // value={value}
                // onChange={handleChange}
                autoComplete="off"
              />
              <TextField
                label="confirm password"
                // value={value}
                // onChange={handleChange}
                autoComplete="off"
              />
              <Button>Submit</Button>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
