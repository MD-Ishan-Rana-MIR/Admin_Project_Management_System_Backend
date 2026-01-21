import { Request, Response, NextFunction } from "express";
import { verifytoken } from "../config/token";
interface JwtPayload {
  userId: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token  = authHeader.split(" ")[1];

  try {
    const decoded = verifytoken(token) as JwtPayload;

    // attach user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
