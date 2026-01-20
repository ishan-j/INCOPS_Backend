const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        await User.create(email, password);
        res.status(201).json({ message: "User saved to SQL DB!" });
    } catch (err) {
        res.status(500).json({ error: "Database error: " + err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ message: `Welcome back ${user.email}!` });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};