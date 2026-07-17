import { Router } from "express";
import {
  getAllListings,
  getListing,
  createNewListing,
  updateListing,
  deleteListing,
  getListingsByUserId,
} from "../controllers/listingController";
import { protect } from "../middleware/authMiddileware";
import { upload } from "../middleware/uploadMiddileware";
import { createListingSchema, updateListingSchema } from "../validators/listingValidator";
import { validate } from "../middleware/validation";

const router = Router();

router.get("/getListings", protect, getAllListings);
router.get("/getListing/:id", protect, getListing);
router.get("/getListingsByUserId", protect, getListingsByUserId);
router.post("/createListing", protect,upload.array("image", 5),validate(createListingSchema), createNewListing);
router.patch("/modifyListing", protect,upload.array("image", 5), validate(updateListingSchema), updateListing);
router.delete("/deleteListing/:id", protect, deleteListing);

export default router;
