import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "name should be at least 3 characters long" })
    .max(50, { message: "name should be at most 50 characters long" }),
});
export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "name should be at least 3 characters long" })
    .max(50, { message: "name should be at most 50 characters long" })
    .optional(),
});
