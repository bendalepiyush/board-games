import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";
import { rollDices } from "@/js/util";
import { apolloClient } from "@/apollo";
import { GET_GAME_DETAILS } from "@/queries/getGameDetails";
import { UPDATE_PLAYER_POSITION } from "@/queries/updatePlayerPosition";

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method Not Allowed. Expecting POST." });
  }

  const { userId } = req.user;

  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ error: "missing gameId." });
  }

  try {
    const diceValues = rollDices(2);

    const { data } = await apolloClient.query({
      query: GET_GAME_DETAILS,
      variables: { gameId },
      fetchPolicy: "network-only",
    });

    const diceValueSum = diceValues.reduce((acc, val) => acc + val, 0);

    const currentPlayerTurnId = data.monopoly_game_by_pk.current_player_turn_id;

    const currentPosition =
      data.monopoly_game_by_pk.monopoly_game_participants.find(
        (p: { player_id: string; current_position: number }) =>
          p.player_id === currentPlayerTurnId
      ).current_position;

    const newPosition = (currentPosition + diceValueSum) % 40;

    const updatePositionRes = await apolloClient.mutate({
      mutation: UPDATE_PLAYER_POSITION,
      variables: {
        gameId,
        currentPlayerId: userId,
        newPosition,
        rollDice: diceValues[0] === diceValues[1] ? true : false,
        diceValues: diceValues,
      },
    });

    return res.status(200).json({ updatePositionRes });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
