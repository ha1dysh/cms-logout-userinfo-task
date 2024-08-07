import {  CustomerAddress } from "@prisma/client";
import { TAddressDto } from "../dto/address.dto";

export const addressMapper = (address: CustomerAddress): TAddressDto => {

  return {
    id: String(address.id),
    country: address.country,
    firstName: address.firstName,
    lastName: address.lastName,
    company: address.company,
    address: address.address,
    apartment: address.apartment,
    city: address.city,
    postalCode: address.postalCode,
    phone: address.phone,
    createdAt: address.createdAt.toJSON(),
    updatedAt: address.updatedAt.toJSON(),
  };
};
