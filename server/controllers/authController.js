import User from "../models/User.js"; // Your User mongoose model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = "30d"

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create JWT token payload
    const payload = { id: user._id, name: user.name, email: user.email };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token, user: payload });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
}