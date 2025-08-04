import * as yup from "yup";

export const playerSchema = yup.object({
  lastName: yup.string().required("Last name is required"),
  firstName: yup.string().required("First name is required"),
  phoneNr: yup
    .string()
    .required("Phone number is required")
    .min(12, "Phone number must be 10 characters"),
  email: yup.string().required("Email is required").matches(
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    'Invalid email format',
  ),
  seriaNr: yup.string(),
  fbLink: yup.string().url("Invalid URL"),
  external: yup.boolean(),
  kmdszID: yup.string().min(6, "KMDSZ ID must be 6 characters"),
});
