const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// User dashboard (accessible to all authenticated users)
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your dashboard", user: req.user });
});

// Admin-only route
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin! You have full access.", user: req.user });
});

module.exports = router;
