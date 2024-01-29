import { NextApiRequest } from "next";

export type jwtPayload = { id: string; username: string };

export interface ExtendedNextApiRequest extends NextApiRequest {
  user: { id: string; username: string };
}
