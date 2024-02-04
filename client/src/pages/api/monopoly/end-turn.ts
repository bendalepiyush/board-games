import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";
import { rollDices } from "@/js/util";
import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo";

const getGameDetailsQuery = gql`
  query GetUser($gameId: uuid!, $currentPlayerId: uuid!) {
    monopoly_game(
      where: {
        id: { _eq: $gameId }
        _and: { current_player_turn_id: { _eq: $currentPlayerId } }
      }
    ) {
      id
      current_player_turn_id
      player_sequence
    }
  }
`;

const updateGameForNextTurn = gql`
  mutation updatePlayerPosition($gameId: uuid!, $nextPlayerTurnId: uuid!) {
    update_monopoly_game_by_pk(
      pk_columns: { id: $gameId }
      _set: { current_player_turn_id: $nextPlayerTurnId, roll_dice: true }
    ) {
      id
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

  const userId = userInfo.id;
  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ error: "missing gameId." });
  }

  try {
    const { data } = await apolloClient.query({
      query: getGameDetailsQuery,
      variables: { gameId, currentPlayerId: userId },
      fetchPolicy: "network-only",
    });

    const currentPlayerTurnId = data.monopoly_game[0].current_player_turn_id;
    const playerSequence = data.monopoly_game[0].player_sequence;

    const currentPlayerIndex = playerSequence.indexOf(currentPlayerTurnId);

    const nextPlayerTurnId =
      playerSequence[(currentPlayerIndex + 1) % playerSequence.length];

    const updateGameRes = await apolloClient.mutate({
      mutation: updateGameForNextTurn,
      variables: {
        gameId,
        nextPlayerTurnId,
      },
    });

    return res.status(200).json(updateGameRes);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
