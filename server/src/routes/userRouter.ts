import { Router } from "express";
import {
  login,
  register,
  getMe,
  deleteUser,
  getAllUsers,
  getUser,
  deactivateUser,
  updateUser,
} from "../controllers/userController";
import { protect, restrictTo } from "../middleware/authMiddileware";


const router = Router();
router.use(protect);
router.get("/:id", getUser);
router.get("/", restrictTo, getAllUsers);
router.get("/me", getMe);
router.delete("/delete/:id", restrictTo, deleteUser);
router.delete("/delete",deactivateUser);
router.patch("/update",updateUser);

export default router;
