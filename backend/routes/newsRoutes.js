import express from "express";
import {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    toggleNewsStatus,
    deleteNews,
    getPublishedNews,
    getLatestNews,
} from "../controllers/newsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/news - Create news
router.post("/", authMiddleware, createNews);

// PUBLIC GET /api/news/published - Get published news
router.get("/published", getPublishedNews);

// PUBLIC GET /api/news/latest - Get latest news
router.get("/latest", getLatestNews);

// GET /api/news - Get all news
router.get("/", authMiddleware, getAllNews);

// GET /api/news/:id - Get news by ID
router.get("/:id", authMiddleware, getNewsById);

// PUT /api/news/:id - Update news by ID
router.put("/:id", authMiddleware, updateNews);

// PUT /api/news/toggle/:id - Toggle isPublished status
router.put("/toggle/:id", authMiddleware, toggleNewsStatus);

// DELETE /api/news/:id - Delete news by ID
router.delete("/:id", authMiddleware, deleteNews);

export default router;