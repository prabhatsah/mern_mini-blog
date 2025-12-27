const express = require("express");
const { login, register, logout } = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/me").get(authMiddleware, (req, res) => {
  return res.status(200).json({ data: req.user });
});
router.route("/logout").get(logout);

module.exports = router;
