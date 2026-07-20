import { NextFunction, Request, Response } from "express";
import {
  createCategory,
  getAllCategory,
  deleteCategoryById,
  modifyCategory,
} from "../models/categoryModel";
import { AppError } from "../utils/appError";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allCategories = await getAllCategory();
    return res.status(200).json({
      message: "All categories fetched successfully",
      numberOfCategories: allCategories.length,
      categories: allCategories,
    });
  } catch (err) {
    next(new AppError("Internal server error", 500));
  }
};
export const CreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    next(new AppError("Internal server error", 500));
  }
};
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.params.id) {
      next(new AppError("Category ID is required", 400));
    }
    const deletedCategory = await deleteCategoryById(req.params.id as string);
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (err) {
    next(new AppError("Internal server error", 500));
  }
};
export const editCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id) {
      next(new AppError("Category ID is required", 400));
    }
    const modifiedCategory = await modifyCategory(id as string, name as string);
    res.status(200).json({
      status: "success",
      message: "Category modified successfully",
      data: modifiedCategory,
    });
  } catch (err) {
    next(new AppError(`${err.message} || "Internal server error"`, 500));
  }
};
