import User from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPassword = await User.hashPassword(password);

    const user = await User.create({ name, email, hashPassword });
    const token = await user.generateAuthToken();

    res.status(201).json({ message: "User create hogyaa!!", token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export { registerUser, getUsers };
// abhi ese hi h
