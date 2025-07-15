import express from "express";
import { getUsers } from "../controllers/userController.js";
import { addUser } from "../controllers/adduserControllers.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);

export default router;
