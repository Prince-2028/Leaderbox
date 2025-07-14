import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
