import express from "express";

import {
  createAlert,
  readAlert,
  updateAlert,
  deleteAlert,
} from "../controllers/alert.controller.js";

const router = express.Router();

router.post("/createalert", createAlert);
router.get("/readalert", readAlert);
router.put("/updatealert", updateAlert);
router.delete("/deletealert", deleteAlert);

export default router;
