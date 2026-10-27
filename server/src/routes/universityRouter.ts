import { Router } from "express";
import { getUniversities } from "../controllers/universityController";

const router = Router();
router.get("/", getUniversities);

export default router;
