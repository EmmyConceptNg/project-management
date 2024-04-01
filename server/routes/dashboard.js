import express from "express";
import { Index } from "../controllers/Dashboard.js";

const router = express.Router();

// login route
router.get("/:userId", Index);

export default router;
