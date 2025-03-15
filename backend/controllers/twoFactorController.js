const speakeasy = require("speakeasy");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1️⃣ Generate OTP Secret & Send QR Code for Setup
exports.setupTwoFactor = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = speakeasy.generateSecret({ length: 20 });

    user.twoFactorTempSecret = secret.base32;
    await user.save();

    res.json({
      secret: secret.base32,
      qrCode: `otpauth://totp/MyApp:${user.email}?secret=${secret.base32}&issuer=MyApp`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 2️⃣ Verify OTP & Enable 2FA
exports.verifyTwoFactor = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.id);
    if (!user || !user.twoFactorTempSecret) return res.status(400).json({ message: "Invalid request" });

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorTempSecret,
      encoding: "base32",
      token,
    });

    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    user.twoFactorSecret = user.twoFactorTempSecret;
    user.twoFactorTempSecret = null;
    user.twoFactorEnabled = true;
    await user.save();

    res.json({ message: "2FA enabled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 3️⃣ Generate OTP for Login (If 2FA is Enabled)
exports.generateTwoFactorToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.twoFactorEnabled) return res.status(400).json({ message: "2FA not enabled" });

    const token = speakeasy.totp({
      secret: user.twoFactorSecret,
      encoding: "base32",
    });

    // Send OTP via email
    const mailOptions = {
      to: user.email,
      subject: "Your 2FA OTP",
      text: `Your OTP code is: ${token}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 4️⃣ Verify OTP at Login
exports.verifyLoginOTP = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.id);
    if (!user || !user.twoFactorEnabled) return res.status(400).json({ message: "2FA not enabled" });

    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
