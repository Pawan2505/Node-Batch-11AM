const express = require("express");
const router = express.Router();
const {
  showLogin,
  showRegister,
  showForgot,
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  showDashboard
} = require("../controllers/authController");

// Page Routes
router.get("/", showLogin);
router.get("/register", showRegister);
router.get("/forgot", showForgot);
router.get("/dashboard", showDashboard)

// Auth Logic
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
