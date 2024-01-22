import { generateClient } from "aws-amplify/api";
import type { NextApiRequest, NextApiResponse } from "next";
import * as mutations from "@/graphql/mutations";
import { MonopolyMaps } from "@/API";
import Amplify from "aws-amplify";
import awsmobile from "@/aws-exports";

import { parseAmplifyConfig } from "aws-amplify/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = generateClient();
  const playerID = req.body.playerID;
  parseAmplifyConfig(awsmobile);

  if (req.method === "POST") {
    const result = await client.graphql({
      query: mutations.createMonopolyGame,
      variables: {
        input: {
          players: [
            {
              id: playerID,
              currentPosition: "start",
              isBankrupt: false,
            },
          ],
          mapID: MonopolyMaps.CLASSIC_MAP,
          isGameStarted: false,
          isGameFinished: false,
        },
      },
    });
    res.status(200).json({ result });
  } else {
    res.status(200).json({ id: "Hello from Next.js!" });
  }
}
