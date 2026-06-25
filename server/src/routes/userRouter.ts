import { Router } from "express";
import { login, register,getMe } from "../controllers/authController";
import {protect}from "../middleware/authMiddileware";
const router=Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",protect,getMe)
export default router;