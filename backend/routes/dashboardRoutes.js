import express from "express";
import { getAdminDashboard } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/data", authMiddleware, getAdminDashboard);

export default router;
