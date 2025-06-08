import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    Admin.findOne({ username, password })
        .then((admin) => {
            if (!admin) return res.status(401).json({ message: "Incorrect username or password" });
            if (admin.password !== password) return res.status(401).json({ message: "Incorrect password" });

            // Generate JWT token
            const token = jwt.sign({ username: admin.username }, SECRET_KEY, { expiresIn: '1h' });

            return res.json({ status: "success", token });
        })
        .catch((error) => {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Server error" });
        });
}