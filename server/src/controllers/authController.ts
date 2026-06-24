import { Response, Request } from "express";
import { findUserByEmail, registerUser } from "../models/UserModel";
import jwt, { SignOptions } from "jsonwebtoken";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

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

export const login =async (req:Request,res:Response)=>{
try{
  const{email,password}=req.body;
  if(!email || !password){
    return res.status(400).json({
        status:"fail",
        message:"you must fill all fields"
    })
  }
  const user=await findUserByEmail(email);
  if(!user){
    throw new Error("Invalid email or password");
  }
  if(!user.isVerifide){
    throw new Error("Please verify your student email before logging in");
  }
  const isPasswordValid=await bcrypt.compare(password,user.password);
  if(!isPasswordValid){
    throw new Error("Invalid email or password");
  }
  const token=CreateToken(user.id,user.name,user.role);
  return res.status(200).json({
    status:"success",
    message:"User logged in successfully",
    token
  })
}catch(err){
    return res.status(400).json({
        status:"fail",
        message:err.message || "there is something wrong please try again!"
    })
}};