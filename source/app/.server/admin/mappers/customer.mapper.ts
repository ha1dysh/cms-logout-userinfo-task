import { Customer, CustomerAddress } from "@prisma/client";
import { TCustomerDto } from "../dto/customer.dto";
import { addressMapper } from "./address.mapper";

export const customerMapper = (customer: Customer): TCustomerDto => {
  const address = "customerAddress" in customer
    ? customer.customerAddress as CustomerAddress[]
    : null;

  return {
    id: String(customer.id),
    firstName: customer.firstName,
    lastName: customer.lastName,
    note: customer.note,
    phone: customer.phone,
    email: customer.email,
    customerAddress: address ? address.map(addressMapper) : null,
    createdAt: customer.createdAt.toJSON(),
    updatedAt: customer.updatedAt.toJSON(),
    deletedAt: customer.deletedAt ? customer.deletedAt.toJSON() : null,
  };
};
