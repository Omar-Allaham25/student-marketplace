import { Request, Response, NextFunction } from "express";
import { findAvailableUniversities } from "../models/UniversityModel";
import { AppError } from "../utils/appError";

export const getUniversities = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const universities = await findAvailableUniversities();
    res.status(200).json({ status: "success", universities });
  } catch (err) {
    next(new AppError(err instanceof Error ? err.message : "Unable to load universities", 500));
  }
};
