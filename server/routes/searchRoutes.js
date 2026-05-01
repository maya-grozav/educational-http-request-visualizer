import express from "express";
import {
  addSearchIndex,
  getSearchIndex,
  syncWikiPagesToSearchIndex,
} from "../controllers/searchController.js";

const router = express.Router();

router.post("/", addSearchIndex);
router.get("/search", getSearchIndex);
router.post("/crawler", syncWikiPagesToSearchIndex);

export default router;
