const User = require("../models/user.model");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User create hogyaa!!", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

module.exports = { registerUser, getUsers };
// abhi ese hi h