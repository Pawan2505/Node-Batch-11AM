const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  let token = req.header("authorization");

  const newToken = token.slice(7, token.length);
  console.log(newToken);

  if (!newToken) {
    return res.status(200).json({ message: "UnAuthorised - Token Required" });
  }
  try {
    var decoded = jwt.verify(newToken, "RNW");
    req.user = decoded;
    next();

  } catch (err) {
    return res.status(200).json({message:"Token Not Match"})
  }
};

module.exports = authAdmin;
