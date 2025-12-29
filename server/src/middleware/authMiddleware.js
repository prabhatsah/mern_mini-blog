const jwt = require("jsonwebtoken");
require("dotenv");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("Middleware triggered, token:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in auth middleware");
    console.log(error);

    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
