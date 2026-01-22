import { Request, Response, NextFunction } from "express";

export const requireRole = (role: "ADMIN") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
