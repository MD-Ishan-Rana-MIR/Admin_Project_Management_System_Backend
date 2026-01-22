import jwt from "jsonwebtoken";
import { config } from "./config";
export interface JwtPayload {
  userId: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  iat: number;
  exp: number;
}

export const generateToken = (payload: {
  userId: string;
  role: string;
}) => {
  return jwt.sign(payload, config.jwtKey, {
    expiresIn: "7d"
  });
};

export const verifytoken = (token: string) => {
  return jwt.verify(token, config.jwtKey) as {
    userId: string;
    role: "ADMIN" | "MANAGER" | "STAFF";
    iat: number;
    exp: number;
  };
};
