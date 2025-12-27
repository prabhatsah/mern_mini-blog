const jwt = require("jsonwebtoken");
require("dotenv");

async function authMiddleware(req, res, next) {
  const token = req.cookies.access_token;

  console.log("Middleware triggered, token:", token);

  if (!token) return res.status(400).json({ message: "Invalid user" });

  const user = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;

  next();
}

module.exports = authMiddleware;
