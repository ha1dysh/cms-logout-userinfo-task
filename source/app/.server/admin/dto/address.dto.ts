import { CustomerAddress } from "@prisma/client";

type ExcludedField = "id" | "createdAt" | "updatedAt" | 'customerId';

export type TAddressDto = Omit<CustomerAddress, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
