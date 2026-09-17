import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";
import {
  findUserByEmail,
  findUserByResetToken,
  updateUser,
} from "../models/UserModel";
import { sendResetPasswordEmail } from "../utils/email";

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
     return res.status(200).json({
        status: "success",
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const resetPasswordExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const resetUrl = `${process.env.BASE_URL}/reset-password/${token}`;
    await updateUser(user.id, { resetPasswordToken, resetPasswordExpiry });
    await sendResetPasswordEmail(email, resetUrl);
    res.status(200).json({
      status: "success",
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (err) {
    return next(
      new AppError(
        err.message || "there is some thing wrong please try again!",
        500,
      ),
    );
  }
};
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.params.token as string;
    const { password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await findUserByResetToken(hashedToken);
    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    const newpassword = bcrypt.hashSync(password, 12);
    await updateUser(user.id, {
      password: newpassword,
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    });
    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully.",
    });
  } catch (err) {
    return next(
      new AppError(
        err.message || "there is some thing wrong please try again!",
        500,
      ),
    );
  }
};
