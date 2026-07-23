import { z } from "zod";

export const createListingSchema = z.object({
  title: z
    .string({ error: "must provide title for product" })
    .min(5, "Title must be at least 5 characters long")
    .max(50, "Title must be at most 50 characters long"),
  description: z
    .string({ error: "must provide description for product" })
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
  price: z.coerce
    .number({ error: "must provide price for product" })
    .positive("Price must be a positive number"),
  condition: z.enum(
    ["new", "like-new", "used", "broken"],
    "Condition must be one of the specified values",
  ),
  categoryId: z
    .string({ error: "must provide category ID for product" })
    .uuid("Category ID must be a valid UUID"),
  imageUrls: z
    .array(z.string().url("Image URL must be a valid URL"))
    .min(1, "At least one image URL is required")
    .max(5, "At most 5 image URLs are allowed"),
});
export const updateListingSchema = z
  .object({
    listingId: z.uuid(
      "product id must be provided or you should select the product you want to update",
    ),
    title: z
      .string()
      .min(5, "Title must be at least 5 characters long")
      .max(50, "Title must be at most 50 characters long")
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .max(1000, "Description must be at most 1000 characters long")
      .optional(),
    price: z.coerce
      .number()
      .positive("Price must be a positive number")
      .optional(),
    condition: z
      .enum(
        ["new", "like-new", "used", "broken"],
        "Condition must be one of the specified values",
      )
      .optional(),
    categoryId: z.string().uuid("Category ID must be a valid UUID").optional(),
    imageUrls: z
      .array(z.string().url("Image URL must be a valid URL"))
      .min(1, "At least one image URL is required")
      .max(5, "At most 5 image URLs are allowed")
      .optional(),
  })
  .refine(
    (data) =>
      Object.keys(data)[0] === "listingId" && Object.keys(data).length > 1,
    {
      message: "At least one field must be provided for listing update",
    },
  );
