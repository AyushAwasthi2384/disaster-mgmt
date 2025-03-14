import express from "express";
import authMidddleware from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMidddleware.authUser, getUserProfile);
router.get("/logout", authMidddleware.authUser, logoutUser);

export default router;
