import {
  BlockStack,
  Card,
  InlineGrid,
  Modal,
  Text,
} from "@shopify/polaris";
import { PlusCircleIcon } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import { TProductDto } from "~/.server/admin/dto/product.dto";
import { useFileUpload } from "~/admin/hooks/useUpload";

export type RoleCardProps = {
  product: TProductDto;
};

export function ProductImages({ product }: RoleCardProps) {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  let { submit } = useFileUpload();

  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Product Images
          </Text>
          <label htmlFor="file">
            <PlusCircleIcon
              width={24}
              height={24}
              fill="#444"
              style={{ cursor: "pointer" }}
            />
          </label>
          <input
            id="file"
            name="file"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => submit(e.currentTarget.files)}
          />
        </InlineGrid>

        {product?.productImages?.map((img) => (
          <img
            key={img.image}
            src={img.image.includes("http") ? img.image : `/${img.image}`}
            style={{
              width: "100%",
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        ))}
      </BlockStack>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Edit review"
      ></Modal>
    </Card>
  );
}
