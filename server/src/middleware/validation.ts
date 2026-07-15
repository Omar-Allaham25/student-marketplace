import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const validate = (schema: z.ZodTypeAny<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errorMessages = err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        next(new AppError("validation Error", 400, errorMessages));
      } else {
        next(err);
      }
    }
  };
};
