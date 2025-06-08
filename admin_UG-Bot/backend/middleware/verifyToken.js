import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json("Token missing");

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json("Invalid or expired token");
        req.user = decoded;
        next();
    });
};

export default verifyToken;
