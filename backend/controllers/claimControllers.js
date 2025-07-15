import { User } from "../models/User.js";

export const claimPoints = async (req, res) => {
  try {
    const { uniqId } = req.body;

    if (!uniqId) {
      return res.status(400).json({ error: "uniqId is required." });
    }

    // Find user correctly
    const user = await User.findById(uniqId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    //  Generate random points
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    //  Update totalPoints
    user.totalPoints += randomPoints;
    await user.save();

    res.status(200).json({
      message: `Added ${randomPoints} points to user.`,
      updatedPoints: user.totalPoints,
      user,
    });
  } catch (error) {
    console.error("Error in claimPoints:", error.message);
    res.status(500).json({ error: "Failed to process claim." });
  }
};
