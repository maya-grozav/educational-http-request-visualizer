import express from "express";
import { addWikiPage, getWikiPage } from "../controllers/wikiController.js";

const router = express.Router();

router.get("/:topic", getWikiPage);
router.get("/", getWikiPage);
router.post("/", addWikiPage);

export default router;
