import express from "express";
import { create, getProject, index, updateStatus } from "../controllers/projects.js";

const router = express.Router();

router.post('/create', create)
router.get("/:workspaceId/:status", index);
router.get("/:projectId/:userId/:status", getProject);
router.get('/:projectId/update-status/:status', updateStatus)


export default router;
