import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";
import { rollDices } from "@/js/util";
import { apolloClient } from "@/apollo";
import { GET_GAME_DETAILS } from "@/queries/getGameDetails";
import { UPDATE_PLAYER_POSITION } from "@/queries/updatePlayerPosition";
import {
  MonopolyGameParticipant,
  Property,
  PropertyMap,
} from "@/types/monopolyGame";
import { MONOPOLY_CLASSIC_PROPERTY_MAP, PLACEHOLDER_UUID } from "@/js/constant";

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

    const {
      current_player_turn_id,
      monopoly_game_participants,
      monopoly_participant_properties,
    }: {
      current_player_turn_id: string;
      monopoly_game_participants: MonopolyGameParticipant[];
      monopoly_participant_properties: Property[];
    } = data.monopoly_game_by_pk;

    const currentPlayer = monopoly_game_participants.find(
      (p) => p.player_id === current_player_turn_id
    );

    if (currentPlayer === undefined) {
      throw new Error("User not found.");
    }

    let currentPlayerCash = currentPlayer.available_cash;

    const currentPosition = currentPlayer.current_position;
    const newPosition = (currentPosition + diceValueSum) % 40;

    // Property Map
    const propertyMap: PropertyMap = {};

    monopoly_game_participants.forEach((participant) => {
      const { player_id, display_color } = participant;

      monopoly_participant_properties
        .filter((property) => property.player_id === player_id)
        .forEach((property) => {
          propertyMap[property.location] = {
            color: display_color,
            playerId: player_id,
            propertiesOwned: property.properties_owned,
          };
        });
    });

    let propertyOwnerId = PLACEHOLDER_UUID;
    let propertyOwnerCash = 0;

    if (propertyMap[newPosition] !== undefined) {
      const propertyOwner = propertyMap[newPosition];

      if (propertyOwner.playerId !== current_player_turn_id) {
        let rentToPay = 0;

        rentToPay =
          MONOPOLY_CLASSIC_PROPERTY_MAP[newPosition].rent[
            propertyOwner.propertiesOwned
          ];

        const propertyOwnerDetails = monopoly_game_participants.find(
          (p) => p.player_id === propertyOwner.playerId
        );

        if (propertyOwnerDetails && rentToPay) {
          propertyOwnerId = propertyOwnerDetails.player_id;
          currentPlayerCash = currentPlayerCash - rentToPay;
          propertyOwnerCash = propertyOwnerDetails.available_cash + rentToPay;
        }
      }
    }

    const updatePositionRes = await apolloClient.mutate({
      mutation: UPDATE_PLAYER_POSITION,
      variables: {
        gameId,
        currentPlayerId: userId,
        newPosition,
        rollDice: diceValues[0] === diceValues[1] ? true : false,
        diceValues: diceValues,
        currentPlayerAvailableCash: currentPlayerCash,
        propertyOwnerId,
        propertyOwnerCash,
      },
    });

    return res.status(200).json({
      updatePositionRes,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
