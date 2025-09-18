const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Remove "Bearer " if present
    const cleanedToken = token.replace("Bearer ", "").trim();

    // Verify token
    const decoded = jwt.verify(cleanedToken, "JWT_SECRET");

    req.user = decoded; // attach decoded payload (e.g., user id) to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
