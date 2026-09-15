import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "name should be at least 3 characters long" })
      .max(50, { message: "name should be at most 50 characters long" }),
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password should be at most 100 characters long" }),
  }),
});
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password should be at most 100 characters long" }),
  }),
});
export const verifyEmailSchema = z.object({
  params: z.object({
    token: z.string({ message: "token required" }),
  }),
});
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.email({ message: "user Email is requierd" }),
  }),
});
export const resetPasswordSchema = z.object({
  body: z.object({
    password: z
      .string({ message: "new Password is requierd" })
      .min(8, { message: "password must at least 8 characters" })
      .max(100, { message: "password too long " }),
  }),
  params: z.object({
    token: z.string({ message: "token is requierd " }),
  }),
});
