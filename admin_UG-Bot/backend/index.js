const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const AdminModel = require('./models/Admin');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    AdminModel.findOne({ username: username })
        .then(user => {
            if (!user) return res.status(400).json("Data not found");
            if (user.password !== password) return res.status(400).json("Incorrect password");

            // Buat JWT token, kadaluarsa dalam 1 jam
            const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
            return res.json({ status: "Success", token });
        })
        .catch(err => res.status(500).json("Login error"))
})

app.post("/register", (req, res) => {
    AdminModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

