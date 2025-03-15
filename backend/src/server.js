require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const twoFactorRoutes = require("./routes/twoFactorRoutes");
const smsTwoFactorRoutes = require("./routes/smsTwoFactorRoutes");
const userRoutes = require("./routes/userRoutes");
const tokenRoutes = require("./routes/tokenRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/2fa", twoFactorRoutes);
app.use("/api/2fa-sms", smsTwoFactorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/token", tokenRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
