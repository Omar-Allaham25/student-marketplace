import {z} from "zod";

export const registerSchema = z.object({
    name:z.string().min(3, {message:"name should be at least 3 characters long"}).max(50, {message:"name should be at most 50 characters long"}),
    email:z.string().email({message:"Please provide a valid email"}),
    password:z.string().min(6, {message:"Password must be at least 6 characters long"}).max(100, {message:"Password should be at most 100 characters long"}),
});
export const loginSchema = z.object({
    email:z.string().email({message:"Please provide a valid email"}),
    password:z.string().min(6, {message:"Password must be at least 6 characters long"}).max(100, {message:"Password should be at most 100 characters long"}),
});