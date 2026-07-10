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

const router = Router();

router.get("/getListings", protect, getAllListings);
router.get("/getListing/:id", protect, getListing);
router.get("/getListingsByUserId", protect, getListingsByUserId);
router.post("/createListing", protect,upload.array("image", 5), createNewListing);
router.patch("/modifyListing", protect,upload.array("image", 5), updateListing);
router.delete("/deleteListing/:id", protect, deleteListing);

export default router;
