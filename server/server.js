import dotenv from "dotenv";
dotenv.config(); 

import connectDB from "./utils/db.js";
import app from "./app.js";
const PORT = process.env.PORT || 5000;

// Connect to DB, then start server
connectDB().then(() => {

	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
});
