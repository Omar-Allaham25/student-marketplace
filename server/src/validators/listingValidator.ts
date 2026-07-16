import {z} from "zod";

export const createListingSchema = z.object({
    title:z.string().min(5,"Title must be at least 5 characters long").max(50,"Title must be at most 50 characters long"),
    description:z.string().min(10,"Description must be at least 10 characters long").max(1000,"Description must be at most 1000 characters long"),
    price:z.coerce.number().positive("Price must be a positive number"),
    condition:z.enum(["new", "like-new", "used", "broken"], "Condition must be one of the specified values"),
    categoryId:z.string().uuid("Category ID must be a valid UUID"),
    imageUrls:z.array(z.string().url("Image URL must be a valid URL")).min(1,"At least one image URL is required").max(5,"At most 5 image URLs are allowed"),
});
export const updateListingSchema = z.object({
    title:z.string().min(5,"Title must be at least 5 characters long").max(50,"Title must be at most 50 characters long").optional(),
    description:z.string().min(10,"Description must be at least 10 characters long").max(1000,"Description must be at most 1000 characters long").optional(),
    price:z.coerce.number().positive("Price must be a positive number").optional(),
    condition:z.enum(["new", "like-new", "used", "broken"], "Condition must be one of the specified values").optional(),
    categoryId:z.string().uuid("Category ID must be a valid UUID").optional(),
    imageUrls:z.array(z.string().url("Image URL must be a valid URL")).min(1,"At least one image URL is required").max(5,"At most 5 image URLs are allowed").optional(),
});
