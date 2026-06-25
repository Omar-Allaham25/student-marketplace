import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

const findUserByEmail = async (email: string) => {
const user = await prisma.user.findUnique({ where: { email } });
return user;
};
export const findUserById = async (id: string) => {
const user = await prisma.user.findUnique({ where: { id } });
if (!user) {
    return null;
}
const { password: _, ...userWithoutPassword } = user;
return userWithoutPassword;
};
export const registerUser = async (
name: string,
email: string,
password: string,
) => {
try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
    throw new Error("Email is already in use");
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
    data: {
        name,
        email,
        password: hashPassword,
        isverifide: process.env.NODE_ENV === "development" ? true : false,
    },
    });
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
} catch (err) {
    throw new Error(
    err.message || "there is something wrong please try again!",
    );
}
};
export const loginUser = async (email: string, password: string) => {
try {
    const user = await findUserByEmail(email);
    if (!user) {
    throw new Error("User not found");
    }
    return user;
} catch (err) {
    throw new Error(
    err.message || "there is something wrong please try again!",
    );
}
};
