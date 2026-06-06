import { Router } from "express";
import { getPortfolio, updateSection } from "../controllers/portfolioController.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = Router();

router.get("/", getPortfolio);

router.put("/:section", verifyFirebaseToken, verifyAdmin, updateSection);

export default router;
