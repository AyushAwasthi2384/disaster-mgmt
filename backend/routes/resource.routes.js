import express from "express";

import {
  createResource,
  readResource,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";

const router = express.Router();

router.post("/createresource", createResource);
router.get("/readresource", readResource);
router.put("/updateresource", updateResource);
router.delete("/deleteresource", deleteResource);

export default router;
