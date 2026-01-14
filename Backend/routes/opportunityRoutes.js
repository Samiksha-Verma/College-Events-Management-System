import express from "express";
import {
  getAllOpportunities,
  addOpportunity,
  deleteOpportunity,
} from "../controllers/opportunityController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllOpportunities);
router.post("/", protect, adminOnly, addOpportunity);
router.delete("/:id", protect, adminOnly, deleteOpportunity);

export default router;