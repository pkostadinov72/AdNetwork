import * as yup from "yup";

export const editProfileSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    fullName: yup
      .string()
      .max(100, "Full name must be less than 100 characters"),
    profession: yup
      .string()
      .max(100, "Profession must be less than 100 characters"),
    biography: yup
      .string()
      .max(500, "Biography must be less than 500 characters"),
    avatarUrl: yup.string().url("Must be a valid URL"),
    coverImageUrl: yup.string().url("Must be a valid URL")
  })
  .required();
