import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Cek apakah header Authorization tersedia dan formatnya benar
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Kirim data pengguna ke endpoint berikutnya
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};

export default authMiddleware;
