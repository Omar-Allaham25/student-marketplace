import { Router } from "express";
import {
  login,
  register,
  getMe,
  deleteUser,
  getAllUsers,
} from "../controllers/authController";
import { protect, restrictTo } from "../middleware/authMiddileware";

const router = Router();
router.get("/", protect,restrictTo, getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.delete("/delete/:id", protect, restrictTo, deleteUser);

export default router;