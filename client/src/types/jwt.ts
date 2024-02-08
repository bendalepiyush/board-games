import { NextApiRequest } from "next";

type User = {
  id: string;
  username: string;
};

export type JwtPayload = User;

export interface ExtendedNextApiRequest extends NextApiRequest {
  user: User;
}
