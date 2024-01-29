import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/js/jwt";
import { jwtPayload } from "@/types/jwt";
import { ExtendedNextApiRequest } from "@/types/jwt";

export const authenticate =
  (
    handler: (
      req: ExtendedNextApiRequest,
      res: NextApiResponse
    ) => Promise<void>
  ) =>
  async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authorizationHeader.substring(7);

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let decoded = verifyToken(token);

      req.user = decoded;

      return handler(req, res);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  };
