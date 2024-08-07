import { withZod } from "@rvf/zod";
import { z } from "zod";
import { emailRule, firstNameRule, lastNameRule, noteRule, phoneRule } from "../CustomersNewForm/CustomersNewForm.validator";

export const customersPrimaryInfoFormValidator = withZod(
  z.object({
    firstName: firstNameRule,
    lastName: lastNameRule,
    email: emailRule,
    phone: phoneRule,
    note: noteRule,
  })
);
