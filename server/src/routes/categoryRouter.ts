import Router from "express";
import { CreateCategory, deleteCategory, editCategory, getAll } from "../controllers/categoryController";
import { protect, restrictTo } from "../middleware/authMiddileware";

const router = Router();
router.get("/getAll", protect, getAll);
router.post("/create", protect, restrictTo, CreateCategory);
router.delete("/delete/:id", protect, restrictTo, deleteCategory);
router.patch("/modify/:id",protect,restrictTo,editCategory);

export default router;
