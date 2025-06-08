import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import auth from './routes/auth.route.js';
import verifyToken from './middleware/verifyToken.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', auth);

app.get("/api/protected", verifyToken, (req, res) => {
    res.json(`Welcome ${req.user.username}, you're authenticated`);
});

app.listen(PORT, () => {
    connectDB()
    console.log(`Server started at http://localhost:${PORT}`);
})