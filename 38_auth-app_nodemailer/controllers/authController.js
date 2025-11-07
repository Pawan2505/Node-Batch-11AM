const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");

// ==================== SHOW PAGES ==================== //
exports.showLogin = (req, res) =>{
    console.log("Login Page!")
     res.render("login");
}
exports.showRegister = (req, res) => {
    console.log("Register Page!")
    res.render("register");
}
exports.showForgot = (req, res) => {
    console.log("Forgot Password Page!")
    res.render("forgot");
}

exports.showDashboard = (req, res) => {
    console.log("Dashboard Page!")
    // res.render("dashboard", {user: req.session.user});
    res.render("dashboard");
};

// ==================== REGISTER ==================== //
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    req.flash("success", "Registration successful! Please login.");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    req.flash("error", "Email already exists!");
    res.redirect("/register");
  }
};

// ==================== LOGIN ==================== //
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }
  req.session.user = user;
  req.flash("success", "Login successful!");
  res.redirect("/dashboard"); // You can create a dashboard page if needed
};

// ==================== FORGOT PASSWORD ==================== //
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "No account found with that email");
    return res.redirect("/forgot");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
  await user.save();

  // Send OTP Email
  await transporter.sendMail({
    from: "your_email@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  req.flash("success", "OTP sent to your email");
  res.render("otp", { email });
};

// ==================== VERIFY OTP ==================== //
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user || user.otpExpires < Date.now()) {
    req.flash("error", "Invalid or expired OTP");
    return res.redirect("/forgot");
  }

  res.render("reset", { email });
};

// ==================== RESET PASSWORD ==================== //
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate({ email }, { password: hash, otp: null, otpExpires: null });
  req.flash("success", "Password reset successful! Please login.");
  res.redirect("/login");
};
