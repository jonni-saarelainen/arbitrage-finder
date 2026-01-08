import { Router } from "express";
import { getArbitrageOpportunities } from "../controllers/arbitrageController.js";

const router = Router();

router.get("/arbitrageOpportunities", getArbitrageOpportunities);

export default router;
