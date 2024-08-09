import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  NodeOnDiskFile,
  json,
} from "@remix-run/node";
import { prisma } from "~/.server/shared/utils/prisma.util";

type Props =  {
  request: Request;
  id: number;
};

export async function productFileUploadAction({ request, id }: Props) {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        filter({ contentType }) {
          return contentType.includes("image");
        },
        directory: "./public",
        avoidFileConflicts: true,
        file({ filename }) {
          return filename;
        },
        maxPartSize: 10 * 1024 * 1024,
      }),
      unstable_createMemoryUploadHandler()
    )
  );

  const files = formData.getAll("file") as NodeOnDiskFile[];
  const file = files?.[0];

  if (!file.type.includes("image")) {
    return formData
  }

  await prisma.productImage.create({
    data: {
      productId: id,
      image: file.name,
    }
  })

  return json({
    files: files.map((file) => ({ name: file.name, url: file.name })),
  });
}
