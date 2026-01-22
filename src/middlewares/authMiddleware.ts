import { Request, Response, NextFunction } from "express";
import { verifytoken, JwtPayload } from "../config/token";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // -----------------------
  // Narrow type for TS
  // -----------------------
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded: JwtPayload = verifytoken(token);
    console.log(req.header.bind, req.headers.role);
    req.headers.id = decoded?.userId;
    req.headers.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
