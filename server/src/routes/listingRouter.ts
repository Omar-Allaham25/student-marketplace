import { Router } from "express";
import {
  getAllListings,
  getListing,
  createNewListing,
} from "../controllers/listingController";
import { protect } from "../middleware/authMiddileware";

const router = Router();

router.get("/getListings", protect, getAllListings);
router.get("/getListing/:id", protect, getListing);
router.post("/createListing", protect, createNewListing);

export default router;
