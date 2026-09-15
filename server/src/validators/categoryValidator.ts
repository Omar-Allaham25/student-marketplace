import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ error: "you must provide name of category" })
      .min(3, { message: "name should be at least 3 characters long" })
      .max(50, { message: "name should be at most 50 characters long" }),
  }),
});
export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ error: "you must provide the new name " })
      .min(3, { message: "name should be at least 3 characters long" })
      .max(50, { message: "name should be at most 50 characters long" }),
  }),
params: z.object({
    id: z.string().uuid({ error: "you must provide a valid category id" }),
  }),
});
export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid({ error: "you must provide a valid category id" }),
  }),
});
