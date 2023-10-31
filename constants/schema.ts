import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SigninType = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  email: z.string().email("invaid_email"),
  password: z
    .string()
    .min(8, "too_small")
    .max(40, "too_big")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
      "format_error"
    ),
  code: z.string().length(6, "length_error"),
});
export type SignupType = z.infer<typeof signupSchema>;
