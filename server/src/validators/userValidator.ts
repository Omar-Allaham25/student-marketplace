import { z } from "zod";

export const getUserById = z.object({
  params: z.object({
    id: z
      .string({ message: "User id is required" })
      .uuid({ message: "User id must be a valid UUID" }),
  }),
});
export const deleteUserSchema = z.object({
  params: z.object({
    id: z
      .string({ message: "User id is required" })
      .uuid({ message: "User Id must be a UUID" }),
  }),
});
export const updateUserSchema = z.object({
  body: z
    .object({
      name: z
        .string({ message: "New Name is requierd" })
        .min(5, { message: "name must be at least 5 characters" })
        .max(50, { message: "name must be less than 50 characters" })
        .optional(),
    })
});
