import express from "express";
import {
    getRegistrationRows,
    getRegistrationById,
    updateRegistrationById,
    toggleEmailStatus,
    deleteRegistrationById
} from "../controllers/botpressController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/botpress/registrations
router.get("/registrations", authMiddleware, getRegistrationRows);
router.get("/registrations/:id", authMiddleware, getRegistrationById);
router.put("/registrations/:id", authMiddleware, updateRegistrationById);
router.put("/registrations/toggle/:id", authMiddleware, toggleEmailStatus);
router.post("/registrations/delete/:id", authMiddleware, deleteRegistrationById);

export default router;
