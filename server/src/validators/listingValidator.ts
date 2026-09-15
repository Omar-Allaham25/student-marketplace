import { z } from "zod";

export const getAllListingsSchema = z.object({
  query: z.object({
    page: z
      .string()
      .regex(/^\d+$/, "Page must be a positive integer")
      .min(1, "Page must be at least 1")
      .max(100, "Page must be at most 100"),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a positive integer")
      .min(1, "Limit must be at least 1")
      .max(50, "Limit must be at most 50"),
    search: z
      .string()
      .min(1, "search must be at least 1 character long")
      .max(100, "search must be at most 100 characters long")
      .optional(),
    minPrice: z
      .string()
      .regex(/^\d+$/, "minPrice must be a positive integer")
      .min(0, "minPrice must be a positive integer")
      .optional(),
    maxPrice: z
      .string()
      .regex(/^\d+$/, "maxPrice must be a positive integer")
      .min(0, "maxPrice must be a positive integer")
      .optional(),
    condition: z.enum(["new", "like-new", "used", "fair"]).optional(),
    categoryId: z.string().uuid("Category ID must be a valid UUID").optional(),
  }),
});
export const createListingSchema = z.object({
  body: z.object({
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
      ["new", "like-new", "used", "fair"],
      "Condition must be one of the specified values",
    ),
    categoryId: z
      .string({ error: "must provide category ID for product" })
      .uuid("Category ID must be a valid UUID"),
    imageUrls: z
      .array(z.string().url("Image URL must be a valid URL"))
      .min(1, "At least one image URL is required")
      .max(5, "At most 5 image URLs are allowed"),
  }),
});
export const updateListingSchema = z
  .object({
    body: z.object({
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
          ["new", "like-new", "used", "fair"],
          "Condition must be one of the specified values",
        )
        .optional(),
      categoryId: z
        .string()
        .uuid("Category ID must be a valid UUID")
        .optional(),
      imageUrls: z
        .array(z.string().url("Image URL must be a valid URL"))
        .min(1, "At least one image URL is required")
        .max(5, "At most 5 image URLs are allowed")
        .optional(),
    }),
  })
  .refine((data) => Object.keys(data).some((key) => key !== "listingId"), {
    message: "At least one field must be provided for listing update",
  });
export const getListingByIdSchema = z.object({
  params: z.object({
    listingId: z.string().uuid("Invalid listingId format"),
  }),
});
export const deleteListingSchema = z.object({
  params: z.object({
    listingId: z.string().uuid("Invalid listingId format"),
  }),
});
export const getListingsByUserIdSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Invalid userId format"),
  }),
});
