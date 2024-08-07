import { Customer } from "@prisma/client";
import { TAddressDto } from "./address.dto";

type ExcludedField =
  | "id"
  | "password"
  | "customerAddress"
  | "createdAt"
  | "updatedAt"
  | "deletedAt";

export type TCustomerDto = Omit<Customer, ExcludedField> & {
  id: string;
  customerAddress: TAddressDto[] | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
