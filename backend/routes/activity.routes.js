import express from "express";

import {
  createActivity,
  readActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.post("/createactivity", createActivity);
router.get("/readactivity", readActivity);
router.put("/updateactivity", updateActivity);
router.delete("/deleteactivity", deleteActivity);

export default router;
