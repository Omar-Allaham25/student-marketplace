import { Response, Request } from "express";
import { registerUser } from "../models/UserModel";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";

const CreateToken = (id: string, name: string, role: Role) => {
  const secretKey = process.env.SECRET_KEY!;
  const tokenExpire = process.env.SECRET_EXP as SignOptions["expiresIn"];

  const token = jwt.sign({ id, name, role }, secretKey as string, {
    expiresIn: tokenExpire,
  });
  return token;
};
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "you must fill all fields",
      });
    }
    const newUser = await registerUser(name, email, password);
    if (!newUser)
      throw new Error("there is something wrong please try again !");
    return res.status(200).json({
      status: "success",
      message: "User registered successfully. Please verify your student email",
      User: newUser,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message || "there is something wrong please try again!",
    });
  }
};
