import express from "express";
import multer from 'multer'
import {
  loginUser,
  signupUser,
  forgotpassword,
  resetpassword,
  verifyUser,
  setUpUser,
  uploadImage, getImage
} from "../controllers/user.js";

const router = express.Router();


// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this uploads directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
router.post("/setup", setUpUser);
router.get("/uploads/:imageName", getImage);
router.post("/:userId/update-profile-image", upload.single("profileImage"), uploadImage);




export default router;
