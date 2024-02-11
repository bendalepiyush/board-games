import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/jwt";

export const signJwtToken = (payload: JwtPayload) => {
  const SECRET: string = process.env.JWT_SECRET_KEY || "";
  return jwt.sign(payload, SECRET);
};

export const verifyToken = (token: string) => {
  const SECRET: string = process.env.JWT_SECRET_KEY || "";
  return jwt.verify(token, SECRET) as JwtPayload;
};
