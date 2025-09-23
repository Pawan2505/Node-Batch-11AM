const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// User Signup
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Check user already exists
    const userExist = await User.findOne({ email:req.body.email });
    if (userExist) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err); // debug
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// User Login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Check user
    const user = await User.findOne({ email: req.body.email });
    console.log("user : ", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, "JWT_SECRET", { expiresIn: "1h" });

    console.log("token : ", token);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.dashboard = async (req, res) => {
  try {
   return res.json({ message: `Welcome ${req.user.id}, this is your dashboard!` });
  } catch (err) {
   return res.status(500).json({ message: "Server error" });
  }
};
