import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../models/UserModel";
import { AppError } from "../utils/appError";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: string };
    }
  }
}
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.Token;
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access",
      });
    }
    const decode = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
    ) as { userId: string; role: string };
    if (!decode) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access",
      });
    }
    const user = await findUserById(decode.userId);
    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    if (!user.isActive) {
      return next(new AppError("Your account is inactive", 403));
    }

    req.user = { userId: user.id, role: user.role };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};
export const restrictTo = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.user?.role;
  if (userRole !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Forbidden: Insufficient privileges",
    });
  }
  next();
};
