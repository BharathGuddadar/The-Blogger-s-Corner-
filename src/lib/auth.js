const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const signToken = (userId) => {
  return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { signToken, verifyToken };
