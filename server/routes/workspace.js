import express from 'express';
import { create, index, getWorkspace, invite } from "../controllers/workspace.js";

const router = express.Router();

router.get('/:userId', index)
router.get('/get-workspace/:workspaceId', getWorkspace)
router.post('/create', create)
router.post('/invite', invite)

export default router