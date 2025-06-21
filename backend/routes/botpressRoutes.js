import express from "express";
import { getRegistrationRows, toggleEmailStatus } from "../controllers/botpressController.js";


const router = express.Router();

// GET /api/botpress/registrations
router.get("/registrations", getRegistrationRows);
router.put("/registrations/toggle/:id", toggleEmailStatus);

export default router;
