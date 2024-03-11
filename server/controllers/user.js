import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import otpGenerator from "otp-generator";
import UserModel from "../models/user.js";
import Workspace from "../models/workspace.js";

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

    const workspace = await Workspace.findOne({userId: user._id}).sort({createdAt: -1})

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

    console.log(newUser);

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
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


export const setUpUser =(req, res) =>{
  const {fullName, userId, industry} = req.body;

  UserModel.findOneAndUpdate({_id : userId}, {fullName, industry}, {new: true}).then(user => res.status(200).json({user})).catch(error => res.status(500).json({error}));
}