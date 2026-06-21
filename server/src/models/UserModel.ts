import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

const findUserByEmail=async(email:string)=>{
    const user =await prisma.user.findUnique({where:{email}})
    return user;
}
export const registerUser=async (name:string,email:string,password:string)=>{
    const existingUser=await findUserByEmail(email);
    if(!existingUser){
        throw new Error("Email is already in use");
    }
    const saltRounds=10;
    const hashPassword =await bcrypt.hash(password,saltRounds);
    const newUser= await prisma.user.create({data:{name,email,password:hashPassword}});
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}
