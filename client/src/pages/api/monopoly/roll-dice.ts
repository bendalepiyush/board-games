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
      monopoly_game_participants(
        where: {
          player_id: { _eq: $currentPlayerId }
          _and: { game_id: { _eq: $gameId } }
        }
      ) {
        current_position
        player_id
      }
      player_sequence
    }
  }
`;

const updatePlayerPositionMutation = gql`
  mutation updatePlayerPosition(
    $gameId: uuid!
    $currentPlayerId: uuid!
    $newPosition: Int!
    $rollDice: Boolean!
  ) {
    update_monopoly_game_participant(
      where: {
        game_id: { _eq: $gameId }
        _and: { player_id: { _eq: $currentPlayerId } }
      }
      _set: { current_position: $newPosition }
    ) {
      returning {
        id
        player_id
        current_position
      }
    }

    update_monopoly_game(
      where: {
        id: { _eq: $gameId }
        _and: { current_player_turn_id: { _eq: $currentPlayerId } }
      }
      _set: { roll_dice: $rollDice }
    ) {
      returning {
        roll_dice
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

  const userId = userInfo.id;
  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ error: "missing gameId." });
  }

  try {
    const diceValues = rollDices(2);

    const { data } = await apolloClient.query({
      query: getGameDetailsQuery,
      variables: { gameId, currentPlayerId: userId },
      fetchPolicy: "network-only",
    });

    const diceValueSum = diceValues.reduce((acc, val) => acc + val, 0);

    const currentPosition =
      data.monopoly_game[0].monopoly_game_participants[0].current_position;
    const newPosition = (currentPosition + diceValueSum) % 40;

    const updatePositionRes = await apolloClient.mutate({
      mutation: updatePlayerPositionMutation,
      variables: {
        gameId,
        currentPlayerId: userId,
        newPosition,
        rollDice: diceValues[0] === diceValues[1] ? true : false,
      },
    });

    return res.status(200).json({ updatePositionRes, diceValues });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
