import express from "express";
import {
  loginUser,
  signupUser,
  forgotpassword,
  resetpassword,
  verifyUser,
} from "../controllers/user.js";

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// forgot password route
router.post("/forgot-password", forgotpassword);

// reset password route
router.post("/reset-password", resetpassword);

// otp route
router.post("/verify-user", verifyUser);

export default router;
