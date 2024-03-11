import express from 'express';
import { create, index } from '../controllers/roles.js';

const router = express.Router();

router.get('/', index)
router.post('/', create)


export default router