import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";
import { rollDices } from "@/js/util";
import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo";

const getGameDetailsQuery = gql`
  query getGameDetailsQuery($gameId: uuid!) {
    monopoly_game_by_pk(id: $gameId) {
      current_player_turn_id
      game_state
      monopoly_game_participants {
        id
        player_id
        current_position
      }
      monopoly_participant_properties {
        id
        location
        player_id
        properties_owned
      }
    }
  }
`;

const updatePlayerPositionMutation = gql`
  mutation updatePlayerPosition(
    $gameId: uuid!
    $currentPlayerId: uuid!
    $newPosition: Int!
    $rollDice: Boolean!
    $diceValues: json!
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

    update_monopoly_game_by_pk(
      pk_columns: { id: $gameId }
      _set: { roll_dice: $rollDice, dice_values: $diceValues }
    ) {
      dice_values
      roll_dice
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

    const tradableLocations = [
      2, 4, 6, 7, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 22, 24, 25, 26, 27, 28,
      29, 30, 32, 33, 35, 36, 38, 40,
    ];

    const tradedLocations: number[] = [];
    const locationsOwnedByOthers: number[] = [];

    data.monopoly_game_by_pk.monopoly_participant_properties.forEach(
      (prop: { player_id: string; location: number }) => {
        tradedLocations.push(prop.location);

        if (prop.player_id !== currentPlayerTurnId) {
          locationsOwnedByOthers.push(prop.location);
        }
      }
    );

    let isEligibleForTrade = false;
    if (
      tradableLocations.includes(newPosition) &&
      !tradedLocations.includes(newPosition)
    ) {
      isEligibleForTrade = true;
    }

    const updatePositionRes = await apolloClient.mutate({
      mutation: updatePlayerPositionMutation,
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
