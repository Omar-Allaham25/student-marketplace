import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({ error: "you must provide name of category" })
    .min(3, { message: "name should be at least 3 characters long" })
    .max(50, { message: "name should be at most 50 characters long" }),
});
export const updateCategorySchema = z.object({
  name: z
    .string({ error: "you must provide the new name " })
    .min(3, { message: "name should be at least 3 characters long" })
    .max(50, { message: "name should be at most 50 characters long" }),
});
