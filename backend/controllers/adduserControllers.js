import { User } from "../models/User.js";

export const addUser = async (req, res) => {
  try {
    const { name, totalPoints } = req.body;
    console.log(name, totalPoints);

    const user = new User({ name, totalPoints });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user." });
  }
};
