import express from "express";
import { getStreamedOverview } from "../controllers/aiController.js";
import {requirePremiumAuth} from '../middleware/requirePremiumAuth.js'
const router = express.Router();

router.get("/stream", requirePremiumAuth, getStreamedOverview);

export default router;
