import AdminModel from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await AdminModel.findOne({ username });
        if (!user) return res.status(400).json("User not found");

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json("Incorrect password");

        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ status: "Success", token });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json("Login error");
    }
};

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await AdminModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json("Username already taken");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

        const newUser = await AdminModel.create({
            username,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json("Register error");
    }
};