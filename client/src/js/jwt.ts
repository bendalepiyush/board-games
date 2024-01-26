import jwt from "jsonwebtoken";

export const signJwtToken = (payload: any) => {
  const SECRET: string = process.env.JWT_SECRET_KEY || "";
  return jwt.sign(payload, SECRET);
};

export const verifyToken = (token: string) => {
  const SECRET: string = process.env.JWT_SECRET_KEY || "";
  return jwt.verify(token, SECRET);
};