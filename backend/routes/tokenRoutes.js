const express = require("express");
const { refreshToken } = require("../controllers/tokenController");

const router = express.Router();

router.get("/refresh", refreshToken);

module.exports = router;
