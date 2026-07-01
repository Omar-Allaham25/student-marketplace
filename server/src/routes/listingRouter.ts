import { Router } from "express";
import {
  getAllListings,
  getListing,
  createNewListing,
  updateListing,
  deleteListing,
} from "../controllers/listingController";
import { protect } from "../middleware/authMiddileware";

const router = Router();

router.get("/getListings", protect, getAllListings);
router.get("/getListing/:id", protect, getListing);
router.post("/createListing", protect, createNewListing);
router.patch("/modifyListing", protect, updateListing);
router.delete("/deleteListing/:id", protect, deleteListing);

export default router;
