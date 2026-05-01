import express from "express";
import { createCheckoutSession } from "../controllers/stripeController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/create-checkout-session", requireAuth, createCheckoutSession);

export default router;
