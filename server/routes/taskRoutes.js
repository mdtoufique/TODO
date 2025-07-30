import express from "express";
import { getTasks,updateTask } from "../controllers/taskControllers.js";
import { verifyApiToken } from "../middlewares/auth.js";
const router = express.Router();

// Optionally use token verification
router.get("/", getTasks);
router.put("/", updateTask);

export default router;
