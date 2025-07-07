import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import botpressRoutes from './routes/botpressRoutes.js';
import newsRoutes from "./routes/newsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rate limiting middleware to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: "Terlalu banyak permintaan dari IP ini. Silakan coba lagi nanti."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/botpress", botpressRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});