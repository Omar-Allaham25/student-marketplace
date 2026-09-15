import Router from "express";
import { protect } from "../middleware/authMiddileware";
import { validate } from "../middleware/validation";
import {
  getFavorites,
  toggleFavorite,
} from "../controllers/favoriteController";
import { favoriteSchema } from "../validators/favoriteValidation";

const router = Router();
router.use(protect);

router.get("/getFavorites", getFavorites);
router.post(
  "/toggleFavorites/:listingId",
  validate(favoriteSchema),
  toggleFavorite,
);

export default router;
