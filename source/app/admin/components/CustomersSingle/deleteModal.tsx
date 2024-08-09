import { withZod } from "@rvf/zod";
import { Modal, InlineStack, Button } from "@shopify/polaris";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { ValidatedErrorBanner } from "~/admin/ui/ValidatedErrorBanner/ValidatedErrorBanner";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";

type CustomerDeleteModalProps = {
  id: string;
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
};

export function CustomerDeleteModal({id, modalActive, setModalActive}: CustomerDeleteModalProps) {
  return (
    <Modal
      open={modalActive}
      onClose={() => setModalActive((s) => !s)}
      title="You sure you want to delete this customer?"
    >
      <Modal.Section>
        <ValidatedForm
          action={`${EAdminNavigation.customers}/${id}`}
          method="post"
          validator={withZod(z.object({}))}
        >
          <ValidatedErrorBanner />
          <input type="hidden" name="actionType" value="delete" />
          <InlineStack gap="200" align="end">
            <Button
              variant="secondary"
              onClick={() => setModalActive((s) => !s)}
            >
              No
            </Button>
            <ValidatedSubmitButton text="Delete" />
          </InlineStack>
        </ValidatedForm>
      </Modal.Section>
    </Modal>
  );
}
