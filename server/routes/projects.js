import express from "express";
import {
  create,
  getProject,
  index,
  updateStatus,
  updateTeamRole,
  updateproject,
  update,
  invite,
} from "../controllers/projects.js";

const router = express.Router();

router.post('/create', create)
router.post('/update', update)
router.post('/invite', invite)
router.get("/:workspaceId/:status", index);
router.get("/:projectId/team/:userId/:role", updateTeamRole);
router.get('/:projectId/update-status/:status', updateStatus)
router.post("/:projectId/update", updateproject);
router.get("/:projectId/:userId/:status", getProject);



export default router;
