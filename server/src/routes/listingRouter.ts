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
import {
  createListingSchema,
  getListingByIdSchema,
  getListingsByUserIdSchema,getAllListingsSchema,
  updateListingSchema,
  deleteListingSchema,
} from "../validators/listingValidator";
import { validate } from "../middleware/validation";

const router = Router();

router.use(protect);

router.get("/getListings", validate(getAllListingsSchema), getAllListings);
router.get("/getListing/:id", validate(getListingByIdSchema), getListing);
router.get("/getListingsByUserId/:id", validate(getListingsByUserIdSchema), getListingsByUserId);
router.post(
  "/createListing",
  upload.array("image", 5),
  validate(createListingSchema),
  createNewListing,
);
router.patch(
  "/modifyListing",
  upload.array("image", 5),
  validate(updateListingSchema),
  updateListing,
);
router.delete("/deleteListing/:id", validate(deleteListingSchema), deleteListing);

export default router;
