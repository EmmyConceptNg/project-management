import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import otpGenerator from "otp-generator";
import UserModel from "../models/user.js";
import Workspace from "../models/workspace.js";
import { accessSync } from "fs";
import path from "path";
import fs from "fs";

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "secretKey");

    const query = {
      $or: [{ userId: user._id }, { "team.userId": user._id }],
    };

    const workspace = await Workspace.findOne(query)
      .populate("team.userId", "fullName email timeZone phone _id")
      .sort({
        createdAt: -1,
      })
      .exec();

    res.status(200).json({ token, user, workspace });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

// signup user
export const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate a random OTP using the otp-generator package
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Encrypt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      otp,
    });

    // console.log(newUser);

    await newUser.save();

    const workspace = req.query.workspace;

    if (workspace) {
      try {
        let useWorkspace= {}
        Workspace = await Workspace.findOneAndUpdate(
          { _id: workspace },
          { $push: { team: { userId: newUser._id } } },
          { new: true }
        ).populate("team.userId", "fullName email timeZone phone _id");
        await Invitation.findOneAndDelete({ email: newUser.email, workspace: workspace});
      } catch (error) {
        console.error("Error updating workspace:", error);
      }
    }

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, workspace: userWorkspace });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

// generate password reset token
export const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    console.log(user.resetToken);
    await user.save();
    res.status(200).json({ message: "Password reset token sent" });
  } catch (error) {
    console.error("Error generating reset token:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the reset token" });
  }
};

// reset password using the token
export const resetpassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Find the user with the provided reset token
    const user = await UserModel.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired reset token" });
    }

    // Encrypt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password and reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the password" });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // check the user existance
    let user = await UserModel.findOne({ email: email });
    if (!user) return res.status(404).send({ error: "User does not exist" });

    // Retrieve the stored OTP from Redis, using the user's email as the key
    const storedOTP = user.otp;

    if (storedOTP === otp) {
      // If the OTPs match, delete the stored OTP from Redis
      user.otp = undefined;

      // Update the user's isVerified property in the database
      await UserModel.findOneAndUpdate(
        { email },
        { isVerified: true },
        {
          returnOriginal: false,
        }
      );

      // Send a success response
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      // If the OTPs do not match, send an error response
      res.status(400).send("Invalid OTP");
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const setUpUser = (req, res) => {
  const { fullName, userId, industry, timeZone, phone } = req.body;

  UserModel.findOneAndUpdate(
    { _id: userId },
    { fullName, industry, timeZone, phone },
    { new: true }
  )
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};


export const uploadImage = async(req, res) =>{
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const {userId} = req.params;

    const filePath = `/uploads/${req.file.filename}`;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found.');
    }
    user.image = filePath;

    await user.save();


    res.status(200).json({ message: 'File uploaded successfully.', filePath, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while updating the profile image.');
  }
}

export const getImage = (req, res) => {
  const imageName = req.params.imageName;
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const imagePath = path.join(__dirname, "..", "uploads", imageName);

  // Check if the image file exists
  if (fs.existsSync(imagePath)) {
    // Send the image file as the response
    res.sendFile(imagePath);
  } else {
    // Image not found, return 404 error
    res.status(404).json({ error: "Image not found" });
  }
};