const { json } = require("express");
const User = require("../model/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { access } = require("fs");
const { log } = require("console");
require("dotenv").config();

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "All fields are mendatory", success: false });

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "Invalid credentials", success: false });

  if (!bcrypt.compare(password + "", user.password)) return res.status(400).json({ message: "Invalid credentials", success: false });

  const payload = { _id: user._id, name: user.name, email: user.email };
  const access_token = await jwt.sign(payload, process.env.JWT_SECRET);

  return res
    .cookie("access_token", access_token, { httpOnly: true, secure: true, sameSite: "None" })
    .status(200)
    .json({ access_token, success: true });
}

async function register(req, res) {
  const { email, name, password } = req.body;

  if (!email || !name || !password) return res.status(400).json({ message: "All fields are mendatory", success: false });

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ message: "User already exists with this email", success: false });

  const salt = await bcrypt.genSalt(10);
  const hashedPasssword = await bcrypt.hash(password + "", salt);

  const user = await User.create({ email, name, password: hashedPasssword });

  return res.status(201).json({ message: "User created successgfully", user: user });
}

// async function fetchUsers(req, res) {
//   const users = await User.find({});

//   if (!users) return res.status(400).json({ message: "Error fetching users", success: false });

//   return res.status(200).json({ message: "Users fetched successfully", users: users });
// }

async function logout(req, res) {
  res.clearCookie("access_token", { httpOnly: true, secure: true });

  return res.status(200).json({ mesage: "Logged out successfully" });
}

module.exports = { login, register, logout };
