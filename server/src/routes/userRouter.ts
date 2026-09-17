import { Router } from "express";
import {
  getMe,
  deleteUser,
  getAllUsers,
  getUser,
  deactivateUser,
  updateUser,
} from "../controllers/userController";
import { validate } from "../middleware/validation";
import { protect, restrictTo } from "../middleware/authMiddileware";
import { deleteUserSchema, getUserById, updateUserSchema } from "../validators/userValidator";
import { upload } from "../middleware/uploadMiddileware";


const router = Router();
router.use(protect);
router.get("/:id", validate(getUserById),getUser);
router.get("/", restrictTo, getAllUsers);
router.get("/me", getMe);
router.delete("/delete/:id", restrictTo,validate(deleteUserSchema), deleteUser);
router.delete("/delete",deactivateUser);
router.patch("/update",upload.single("avatar"),validate(updateUserSchema),updateUser);

export default router;
