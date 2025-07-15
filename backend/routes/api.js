import express from "express";
import { getUsers } from "../controllers/userController.js";
import { addUser } from "../controllers/adduserControllers.js";
import { claimPoints } from "../controllers/claimControllers.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.post("/claim", claimPoints);

export default router;
