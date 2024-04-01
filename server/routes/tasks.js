import express from "express";
import { create, index, changeStatus } from "../controllers/Tasks.js";

const router = express.Router();

router.get("/:milestoneId", index);
router.post("/create", create);
router.post("/change-status", changeStatus);


export default router;
