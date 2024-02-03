import { gql } from "@apollo/client";
import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "../../../types/jwt";
import { apolloClient } from "../../../apollo";

const startGameMutation = gql`
  mutation startGameMutation(
    $gameId: uuid!
    $playerIds: [uuid!]!
    $gameStatus: String!
    $startingCash: Int!
  ) {
    update_monopoly_game_by_pk(
      pk_columns: { id: $gameId }
      _set: { game_state: $gameStatus }
    ) {
      id
    }
    update_monopoly_game_participant(
      where: { player_id: { _in: $playerIds }, game_id: { _eq: $gameId } }
      _set: { available_cash: $startingCash }
    ) {
      returning {
        id
      }
    }
  }
`;

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method Not Allowed. Expecting POST." });
  }

  const userInfo = req.user;

  if (!userInfo) {
    return res.status(400).json({ error: "missing information in token." });
  }

  const { gameId, startingCash, playerIds } = req.body;

  if (!gameId || !startingCash || !playerIds) {
    return res
      .status(400)
      .json({ error: "missing gameId / startingCash / playerIds" });
  }

  try {
    const startGameRes = await apolloClient.mutate({
      mutation: startGameMutation,
      variables: {
        gameId,
        playerIds,
        gameStatus: "STARTED",
        startingCash,
      },
    });

    return res.status(200).json(startGameRes);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
