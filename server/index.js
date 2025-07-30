import dotenv from "dotenv";
dotenv.config();

import connectDB from "./utils/db.js";
import app from "./app.js";

// Ensure DB is connected before handling requests
await connectDB();

export default app;
