import AdminModel from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await AdminModel.findOne({ username });
        console.log("User found in DB:", user);
        if (!user) return res.status(400).json("Data not found");
        if (user.password !== password) return res.status(400).json("Incorrect password");
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ status: "Success", token });
    } catch (err) {
        return res.status(500).json("Login error");
    }
};

export const register = async (req, res) => {
    try {
        const newUser = await AdminModel.create(req.body);
        return res.json(newUser);
    } catch (err) {
        return res.status(500).json(err);
    }
};