const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { setupTwoFactor, verifyTwoFactor, generateTwoFactorToken, verifyLoginOTP } = require("../controllers/twoFactorController");

const router = express.Router();

router.post("/setup", authMiddleware, setupTwoFactor);
router.post("/verify", authMiddleware, verifyTwoFactor);
router.post("/generate-otp", authMiddleware, generateTwoFactorToken);
router.post("/verify-otp", authMiddleware, verifyLoginOTP);

module.exports = router;
