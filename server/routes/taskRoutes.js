import express from "express";
import { getTasks,updateTask,deleteTask } from "../controllers/taskControllers.js";
import { verifyApiToken } from "../middlewares/auth.js";
const router = express.Router();

// Optionally use token verification
router.get("/", getTasks);
router.put("/", updateTask);
router.delete("/:id", deleteTask);
export default router;
