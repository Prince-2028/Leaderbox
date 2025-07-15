import mongoose from "mongoose";
const userScehme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {timestamps: true}
);
export const User = mongoose.model("User", userScehme);