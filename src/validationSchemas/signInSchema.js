import z from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(3, { message: "Username or Email must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
