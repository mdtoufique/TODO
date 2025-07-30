import dotenv from "dotenv";
dotenv.config(); 


export function verifyApiToken(req, res, next) {
	const clientToken = req.headers["x-api-token"];
	const serverToken = process.env.API_TOKEN;

	if (!clientToken || clientToken !== serverToken) {
		return res.status(401).json({ message: "Unauthorized: Invalid or missing API token" });
	}
	next();
}

import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
