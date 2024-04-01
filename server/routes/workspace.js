import express from 'express';
import { create, index, getWorkspace, invite, acceptInvite } from "../controllers/workspace.js";

const router = express.Router();

router.get('/:userId', index)
router.get('/get-workspace/:workspaceId', getWorkspace)
router.post('/create', create)
router.post('/invite', invite)
router.get('/accept-invite/:workspaceId/:userEmail', acceptInvite)

export default router