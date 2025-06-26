import express from "express";
import {
    getRegistrationRows,
    getRegistrationById,
    updateRegistrationById,
    toggleEmailStatus,
    deleteRegistrationById
} from "../controllers/botpressController.js";

const router = express.Router();

// GET /api/botpress/registrations
router.get("/registrations", getRegistrationRows);
router.get("/registrations/:id", getRegistrationById);
router.put("/registrations/:id", updateRegistrationById);
router.put("/registrations/toggle/:id", toggleEmailStatus);
router.post("/registrations/delete/:id", deleteRegistrationById);

export default router;
