import { Request, Response } from "express";
import {
  createCategory,
  getAllCategory,
  deleteCategoryById,
  modifyCategory,
} from "../models/categoryModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const allCategories = await getAllCategory();
    return res.status(200).json({
      message: "All categories fetched successfully",
      numberOfCategories: allCategories.length,
      categories: allCategories,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const CreateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    const deletedCategory = await deleteCategoryById(req.params.id as string);
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
export const editCategory=async(req:Request,res:Response)=>{
  try{
    const {id}=req.params;
    const {name}=req.body;
    if(!id ){
      return res.status(400).json({message:"Category ID is required"});
      }
      const modifiedCategory=await modifyCategory(id as string,name as string);
      res.status(200).json({
        status:"success",
        message:"Category modified successfully",
        data:modifiedCategory,
      })

}catch(err){
    res.status(500).json({
      status:"error",
      message:err.message || "Internal server error"
    });
  }

  }
