import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import app from "./app.js";

dotenv.config(); // Load .env variables

const PORT = process.env.PORT || 5000;

// Connect to DB, then start server
connectDB().then(() => {

	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
});
