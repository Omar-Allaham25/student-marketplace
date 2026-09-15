import express from "express";
import { login, register, verifyEmail } from "../controllers/userController";
import { forgotPasswordSchema, loginSchema, registerSchema, verifyEmailSchema,resetPasswordSchema } from "../validators/authValidator";
import { validate } from "../middleware/validation";
import { forgotPassword,resetPassword } from "../controllers/authController";

const router=express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/verify-email/:token",validate(verifyEmailSchema), verifyEmail);
router.post("/forgot-password",validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password/:token",validate(resetPasswordSchema) ,resetPassword);
export default router;