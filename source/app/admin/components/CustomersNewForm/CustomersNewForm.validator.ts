import { withZod } from "@rvf/zod";
import { z } from "zod";

export const emailRule = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email("Must be a valid email");

export const firstNameRule = z
  .string()
  .trim()
  .min(1, { message: "First Name is required" });

export const lastNameRule = z
  .string()
  .trim()
  .min(1, { message: "Last Name is required" });

export const passwordRule = z
  .string()
  .trim()
  .min(8, { message: "Password must be greater than 8" });

export const phoneRule = z
  .string()
  .trim()
  .optional();

export const noteRule = z
  .string()
  .trim()
  .optional();

export const passwordConfirmRule = z.string();

export const customersNewFormValidator = withZod(
  z
    .object({
      firstName: firstNameRule,
      lastName: lastNameRule,
      email: emailRule,
      password: passwordRule,
      passwordConfirm: passwordConfirmRule,
      phone: phoneRule,
      note: noteRule,
    })
    .refine((data) =>  data.password === data.passwordConfirm,
      {
        message: "Passwords don't match",
        path: ["passwordConfirm"],
      }
    )
);
