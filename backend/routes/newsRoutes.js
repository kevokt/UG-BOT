import express from "express";
import {
    createNews,
    getAllNews,
    getNewsById,
    updateNews,
    deleteNews,
    getPublishedNews,
    getLatestNews,
} from "../controllers/newsController.js";

const router = express.Router();

// POST /api/news - Create news
router.post("/", createNews);

// GET /api/news/published - Get published news
router.get("/published", getPublishedNews);

// GET /api/news/latest - Get latest news
router.get("/latest", getLatestNews);

// GET /api/news - Get all news
router.get("/", getAllNews);

// GET /api/news/:id - Get news by ID
router.get("/:id", getNewsById);

// PUT /api/news/:id - Update news by ID
router.put("/:id", updateNews);

// DELETE /api/news/:id - Delete news by ID
router.delete("/:id", deleteNews);

export default router;