import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id, username } = req.user;

    res.json({ id, username });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
