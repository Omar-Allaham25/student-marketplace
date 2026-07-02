import prisma from "../lib/prisma";
import { Condition } from "@prisma/client";
import { findUserById } from "./UserModel";

export const getAll = async (filters?: Record<string, any>) => {
  try {
    const whereClause: Record<string, any> = {};
    if (filters) {
      if (filters.search) {
        whereClause.OR = [
          { title: { contains: filters.search, mode: "insensitive" } },
          { description: { contains: filters.search, mode: "insensitive" } },
        ];
      }
      if (filters.minPrice || filters.maxPrice) {
        if (filters.minPrice) {
          whereClause.price = { gte: filters.minPrice };
        }
        if (filters.maxPrice) {
          whereClause.price = { lte: filters.maxPrice };
        }
      }
      if (filters.condition) whereClause.condition = filters.condition;
      if (filters.categoryId) whereClause.categoryId = filters.categoryId;
    }
    const allListings = await prisma.listing.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return allListings;
  } catch (err) {
    throw new Error("Error fetching listings: " + err.message);
  }
};
export const getOne = async (id: string) => {
  try {
    const listing = await prisma.listing.findMany({ where: { id } });
    return listing;
  } catch (err) {
    throw new Error("there is problem in fetch listing now !");
  }
};
export const createListing = async (
  userId: string,
  categoryId: string,
  title: string,
  description: string,
  price: number,
  condition: Condition,
) => {
  try {
    const newListing = await prisma.listing.create({
      data: {
        userId,
        categoryId,
        title,
        description,
        price,
        condition,
      },
    });
    return newListing;
  } catch (err) {
    throw new Error(
      err.message || "there is some thingwrong in adding new products",
    );
  }
};
export const modifyListing = async (id: string, userId: string, data: any) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id } });
    const userWantToUpdate = await findUserById(userId);
    if (!listing) throw new Error("there is no listing");
    if (userId !== listing.userId || userWantToUpdate?.role === "student")
      throw new Error("UNAUTHORIZED");
    return await prisma.listing.update({ where: { id }, data });
  } catch (err) {
    throw new Error(
      err.message || "there is something wrong in editing products",
    );
  }
};
export const removeListing = async (id: string, userId: string) => {
  try {
    const userWantToDelete = await findUserById(userId);
    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) throw new Error("there is no listing");
    if (listing.userId !== userId || userWantToDelete?.role === "student")
      throw new Error("UNAUTHORIZED");
    return await prisma.listing.delete({ where: { id } });
  } catch (err) {
    throw new Error(
      err.message || "there is something wrong in deleting products",
    );
  }
};
