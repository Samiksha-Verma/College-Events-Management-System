import express from "express";
import {
  getAllEvents,
  addEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllEvents);
router.post("/", protect, adminOnly, addEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);

export default router;