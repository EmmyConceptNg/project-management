import express from "express";
import { create, index, changeStatus, getTask } from "../controllers/Tasks.js";

const router = express.Router();

router.post("/create", create);
router.post("/change-status", changeStatus);
router.get("/get-task/:taskId", getTask);
router.get("/:milestoneId", index);


export default router;
