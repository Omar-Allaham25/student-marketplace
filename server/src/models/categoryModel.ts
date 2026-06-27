import prisma from "../lib/prisma";
import slugify from "slugify";

export const getAllCategory = () => {
  const allCategories = prisma.category.findMany();
  return allCategories;
};
export const createCategory = (name: string) => {
  const slug = slugify(name, { lower: true, trim: true, strict: true });
  const newCategory = prisma.category.create({ data: { name, slug } });
  return newCategory;
};
export const deleteCategoryById = (id: string) => {
  const deletedCategory = prisma.category.delete({ where: { id } });
  return deletedCategory;
};
