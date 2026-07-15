import { Response, Request, NextFunction } from "express";
import AppError from "../utils/appError";
export const handlerError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if(process.env.NODE_ENV === "development"){
        res.status(error.statusCode).json({
            status:error.status,
            message:error.message,
            errors:error.errors,
            stack:error.stack
        })
    }else{
        if(error.isOperational){
            res.status(error.statusCode).json({
                status:error.status,
                message:error.message
            })
        }else{
            console.log("CRITICAL ERROR :", error);
            res.status(500).json({
                status:"error",
                message:"Something went wrong!"
            })
        }
    }
};
