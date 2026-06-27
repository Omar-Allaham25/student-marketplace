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
export const modifyCategory = (id: string, name: string) => {
  try{
    const slug= slugify(name,{lower:true,trim:true,strict:true});
    const mofiedCategory = prisma.category.update({where:{id},data:{name,slug}});
    return mofiedCategory;
}catch(err){
throw new Error(err.message || "Internal server error");
}
};
export const deleteCategoryById = (id: string) => {
  const deletedCategory = prisma.category.delete({ where: { id } });
  return deletedCategory;
};
