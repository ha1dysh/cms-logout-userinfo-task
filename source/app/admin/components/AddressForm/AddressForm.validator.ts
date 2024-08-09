import { withZod } from "@rvf/zod";
import { z } from "zod";

export const countryRule = z.string().trim().optional();
export const firstNameRule = z.string().trim().optional();
export const lastNameRule = z.string().trim().optional();
export const companyRule = z.string().trim().optional();
export const addressRule = z.string().trim().optional();
export const apartmentRule = z.string().trim().optional();
export const cityRule = z.string().trim().optional();
export const postalCodeRule = z.coerce.number().optional()
export const phoneRule = z.string().trim().optional();
export const addressIdRule = z.coerce.number().optional()

export const AddressFormValidator = withZod(
  z.object({
    country: countryRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
    company: companyRule,
    address: addressRule,
    apartment: apartmentRule,
    city: cityRule,
    postalCode: postalCodeRule,
    phone: phoneRule,
    addressId: addressIdRule,
  })
);
