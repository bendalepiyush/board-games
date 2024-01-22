import { NextApiRequest, NextApiResponse } from "next";
import runQuery from "@/js/hasura";

type ApiResponse = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const { id, status } = req.body;
  console.log(status);

  try {
    const mutation = `
      mutation MyMutation {
        update_user(where: {id: {_eq: "${id}"}}, _set: {status: "${status}"}) {
          returning {
            id
            status
          }
        }
      }
    `;

    const result = await runQuery(mutation);

    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    res.status(400).json({ message: "Error while updating status" });
  }
};

export default handler;
