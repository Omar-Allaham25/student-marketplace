import { Response, Request } from "express";
import {
  loginUser,
  registerUser,
  findUserById,
  deleteUserById,
  findAllUsers,
} from "../models/UserModel";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

const createToken = (id: string, name: string, role: Role) => {
  const secretKey = process.env.SECRET_KEY!;
  const tokenExpire = process.env.SECRET_EXP as SignOptions["expiresIn"];

  const token = jwt.sign({ userId: id, name, role }, secretKey as string, {
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "you must fill all fields",
      });
    }
    const user = await loginUser(email, password);
    if (!user.isActive) {
      throw new Error("Your account is deactivated");
    }
    if (!user.isVerifide) {
      throw new Error("Please verify your student email before logging in");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = createToken(user.id, user.name, user.role);
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: err.message || "there is something wrong please try again!",
    });
  }
};
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }
    const user = await findUserById(userId as string);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: "success",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message || "there is something wrong please try again!",
    });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      status: "success",
      numberOfUsers: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message || "there is something wrong please try again!",
    });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await deleteUserById(userId as string);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message || "there is something wrong please try again!",
    });
  }
};
