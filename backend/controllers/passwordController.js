const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// 1️⃣ Forgot Password - Generate Token & Send Email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send email with reset link
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
      to: user.email,
      subject: "Password Reset Request",
      text: `Click this link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset password email sent!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 2️⃣ Reset Password - Verify Token & Update Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user by token and check if it's still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset token fields
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    res.json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
