import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import seedUsers from "./utills/seedUser.js";
import userRoutes from "./routes/api.js";
const port = process.env.PORT || 5000;
import cors from "cors";
app.use(cors());


connectDB().then(() => {
  seedUsers();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
