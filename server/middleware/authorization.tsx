const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || ""; // Fallback value for JWT secret

const unauthorizedError = (res: Response) => {
  return res.status(403).json({ error: "Unauthorized. Access denied!" });
};

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization") || "";

  if (!authHeader.startsWith("Bearer ")) {
    return unauthorizedError(res);
  }

  const token = authHeader.substring(7);

  try {
    const payload = await jwt.verify(token, JWT_SECRET);

    req.user = payload.user;
    next();
  } catch (err: any) {
    console.error(err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
