import express from "express";
import { createReport, getAllReports, deleteReport, toggleReportStatus } from "../controllers/reportController.js";

const router = express.Router();

// POST /api/reports - Create a new report
router.post("/", createReport);
// GET /api/reports - Get all reports
router.get("/", getAllReports);
// DELETE /api/reports/:id - Delete a report by ID
router.delete("/:id", deleteReport);
// PUT /api/reports/:id/status - Update report status by ID
router.put("/:id/status", toggleReportStatus);

export default router;