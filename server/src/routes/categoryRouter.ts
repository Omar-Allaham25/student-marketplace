import Router from "express";
import { CreateCategory, deleteCategory, editCategory, getAll } from "../controllers/categoryController";
import { protect, restrictTo } from "../middleware/authMiddileware";
import { validate } from "../middleware/validation";
import { createCategorySchema, updateCategorySchema } from "../validators/categoryValidator";

const router = Router();
router.get("/getAll", protect, getAll);
router.post("/create", protect, restrictTo, validate(createCategorySchema), CreateCategory);
router.patch("/modify/:id",protect,restrictTo,validate(updateCategorySchema),editCategory);
router.delete("/delete/:id", protect, restrictTo, deleteCategory);

export default router;
