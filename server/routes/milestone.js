import express from "express";
import { create, index, changeStatus, getMilestone } from "../controllers/Milestones.js";

const router = express.Router();

router.get("/get-milestone/:milestoneId", getMilestone);
router.get("/:projectId", index);
router.post("/create", create);
router.post("/change-status", changeStatus);

export default router;
