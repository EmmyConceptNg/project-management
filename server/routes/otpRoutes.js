import express from "express";
import { sendOTP } from "../controllers/otpCotroller.js";

const router = express.Router();

// login route
router.post("/send-otp", sendOTP);

export default router;
