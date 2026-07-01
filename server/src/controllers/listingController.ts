import { Request, Response } from "express";
import {
  getAll,
  getOne,
  createListing,
  modifyListing,
  removeListing,
} from "../models/listingModel";

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const allProducts = await getAll(filters as Record<string, any>);
    res.status(200).status(200).json({
      status: "succes",
      numberOfProducts: allProducts.length,
      listings: allProducts,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Internal server error",
    });
  }
};
export const getListing = async (req: Request, res: Response) => {
  try {
    const listingId = req.params.id as string;
    if (!listingId) {
      res.status(400).json({
        status: "fail",
        message: "id is required !",
      });
    }
    const listing = await getOne(listingId);
    if (!listing) throw new Error("there is now listing ");
    res.status(200).json({
      status: "success",
      data: listing,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.meassage || "there is something wrong please try  later!",
    });
  }
};
export const createNewListing = async (req: Request, res: Response) => {
  try {
    let { categoryId, title, description, price, condition } = req.body;
    price = Number(price);
    const userId = req.user?.id;
    if (
      !userId ||
      !categoryId ||
      !title ||
      !description ||
      !price ||
      !condition
    ) {
      res.status(400).json({
        status: "fail",
        message: "all fields required, please fill all of them and try again",
      });
    }
    const newListing = await createListing(
      userId as string,
      categoryId,
      title,
      description,
      price,
      condition,
    );
    res.status(201).json({
      status: "success",
      data: newListing,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message || "there is something wrong in server side ",
    });
  }
};
export const updateListing = async (req: Request, res: Response) => {
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
    if (price) price = Number(price);
    const userId = req.user?.id;
    if (!listingId) {
      res.status(400).json({
        status: "fail",
        message: "id of listing you want update is missing",
      });
    }
    if (
      !title &&
      !description &&
      !price &&
      !condition &&
      !status &&
      !categoryId
    ) {
      res.status(400).json({
        status: "fail",
        message:
          "you did't update any thing should provide a field at least for update",
      });
    }
    const data = { title, description, price, condition, status, categoryId };
    const updatedListing = await modifyListing(listingId, userId, data);
    res.status(200).json({
      status: "success",
      message: "product updated succesfully",
      data: updatedListing,
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message || "there is problem from server",
    });
  }
};
export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listingId = req.params.id;
    const userId = req.user?.id;
    if (!listingId) {
      res.status(400).json({
        status: "fail",
        message: "id of listing you want delete is missing",
      });
    }
    await removeListing(listingId as string, userId as string);
    res.status(200).json({
      status: "success",
      message: "product deleted succesfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message || "there is problem from server",
    });
  }
};
