import express from "express";
import { createReport, getAllReports, deleteReport, toggleReportStatus } from "../controllers/reportController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC POST /api/reports - Create a new report
router.post("/", createReport);
// GET /api/reports - Get all reports
router.get("/", authMiddleware, getAllReports);
// DELETE /api/reports/:id - Delete a report by ID
router.delete("/:id", authMiddleware, deleteReport);
// PUT /api/reports/:id/status - Update report status by ID
router.put("/:id/status", authMiddleware, toggleReportStatus);

export default router;