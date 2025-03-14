import express from "express";
import { registerUser, getUsers } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/profile", getUsers);

export default router;
// abhi ese hi h
