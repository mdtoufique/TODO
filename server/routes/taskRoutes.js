import express from "express";
import { getTasks,updateTask,deleteTask,createTask } from "../controllers/taskController.js";
import { verifyApiToken } from "../middlewares/auth.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

// Optionally use token verification
router.get("/",  verifyToken, getTasks);
router.put("/",  verifyToken, updateTask);
router.delete("/:id",  verifyToken, deleteTask);
router.post("/",  verifyToken, createTask);


export default router;
