import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";
import cleanupExpiredData from "./utils/cleanup.js";

cleanupExpiredData();

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/opportunities", opportunityRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("College Events Portal Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});