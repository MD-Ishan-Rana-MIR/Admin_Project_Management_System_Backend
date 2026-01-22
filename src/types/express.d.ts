import { JwtPayload } from "../config/token"; // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: "ADMIN" | "MANAGER" | "STAFF";
      };
    }
  }
}

export {};
