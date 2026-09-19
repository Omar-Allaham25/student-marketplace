import { NextFunction, Request, Response } from "express";
import {
  getAll,
  getOne,
  createListing,
  modifyListing,
  removeListing,
  getListingsByUserId as getListingsByUserIdModel,
} from "../models/listingModel";
import { AppError } from "../utils/appError";
import { uploadImageToCloudinary } from "../models/cloudinaryModel";
import { findUserById } from "../models/UserModel";

export const getAllListings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, minPrice, maxPrice, condition, categoryId, page, limit } =
      req.query;
    let filters: any = {};
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    if (search) filters.search = search as string;
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (condition) filters.condition = condition as string;
    if (categoryId) filters.categoryId = categoryId as string;
    const { totalCount, listings } = await getAll(
      pageNumber,
      limitNumber,
      filters as Record<string, any>,
    );
    const totalPages = Math.ceil(totalCount / limitNumber);
    res.status(200).json({
      status: "success",
      resultLength: listings.length,
      pagination: {
        totalItems: totalCount,
        currentPage: pageNumber,
        totalPages: totalPages,
        limit: limitNumber,
      },
      data: listings,
    });
  } catch (err) {
    next(new AppError(err.message || "Internal server error", 500));
  }
};
export const getListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = req.params.id as string;
    const listing = await getOne(listingId);
    if (!listing) {
      return next(new AppError("there is no product whith this id", 404));
    }
    res.status(200).json({
      status: "success",
      data: listing,
    });
  } catch (err) {
    next(
      new AppError(
        err.message || "there is something wrong please try  later!",
        500,
      ),
    );
  }
};
export const createNewListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let { categoryId, title, description, price, condition } = req.body;
    price = Number(price);
    const userId = req.user?.userId;
    const files = req.files as Express.Multer.File[];
    if (files.length === 0) {
      return next(new AppError("At least one image is required", 400));
    }
    const imagesUrls = await Promise.all(
      files.map((file) =>
        uploadImageToCloudinary(file.buffer, "student_marketplace_listings"),
      ),
    );
    const newListing = await createListing(
      userId as string,
      categoryId,
      title,
      description,
      price,
      condition,
      imagesUrls,
    );
    res.status(201).json({
      status: "success",
      data: newListing,
    });
  } catch (err) {
    next(
      new AppError(
        err.message || "there is something wrong in server side ",
        500,
      ),
    );
  }
};
export const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let {
      listingId,
      title,
      description,
      price,
      condition,
      status,
      categoryId,
    } = req.body;
    if (price !== undefined) price = Number(price);
    const userId = req.user?.userId as string;
    const files = req.files as Express.Multer.File[];
    if (files.length === 0) {
      return next(new AppError("At least one image is required", 400));
    }
    const imagesUrls = await Promise.all(
      files.map((file) =>
        uploadImageToCloudinary(file.buffer, "student_marketplace_listings"),
      ),
    );
    const data = { title, description, price, condition, status, categoryId };
    const imagedata = imagesUrls.length > 0 ? imagesUrls : undefined;
    const updatedListing = await modifyListing(
      listingId,
      userId,
      data,
      imagedata,
    );
    res.status(200).json({
      status: "success",
      message: "product updated succesfully",
      data: updatedListing,
    });
  } catch (err) {
    return next(new AppError(err.message || "Internal Error", 500));
  }
};
export const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = req.params.id;
    const userId = req.user?.userId as string;
    await removeListing(listingId as string, userId);
    res.status(200).json({
      status: "success",
      message: "product deleted succesfully",
    });
  } catch (err) {
    return next(
      new AppError(err.message || "there is problem from server", 500),
    );
  }
};
export const getListingsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.id as string;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User is not found",
      });
    }
    if (!user.isActive) {
      return res.status(404).json({
        status: "fail",
        message: "User is unavailable",
      });
    }
    const listings = await getListingsByUserIdModel(userId);
    res.status(200).json({
      status: "success",
      numberOfListings: listings.length,
      listings,
    });
  } catch (err) {
    next(
      new AppError(err.message || "there is something wrong in server", 500),
    );
  }
};
