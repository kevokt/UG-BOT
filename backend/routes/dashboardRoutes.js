import express from "express";
import { getAdminDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/data", getAdminDashboard);

export default router;
