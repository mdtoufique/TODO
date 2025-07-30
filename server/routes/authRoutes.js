import express from "express";
import { verifyApiToken } from "../middlewares/auth.js";

import { signup, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;