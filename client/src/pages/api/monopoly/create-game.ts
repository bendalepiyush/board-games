import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo";
import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";

const createGameQuery = gql`
  mutation CreateGame(
    $admin: uuid!
    $currentPlayerTurnId: uuid!
    $gameState: String!
    $map: String!
    $playerSequence: [uuid!]!
    $settings: json!
  ) {
    insert_monopoly_game_one(
      object: {
        admin: $admin
        current_player_turn_id: $currentPlayerTurnId
        game_state: $gameState
        map: $map
        player_sequence: $playerSequence
        settings: $settings
      }
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
    return res.status(400).json({ error: "id (userId) field missing." });
  }

  const userId = userInfo.id;

  try {
    const createGameResult = await apolloClient.mutate({
      mutation: createGameQuery,
      variables: {
        admin: userId,
        currentPlayerTurnId: userId,
        gameState: "CREATED",
        map: "classic_map",
        playerSequence: [],
        settings: {
          maxPlayers: 4,
          privateRoom: true,
          onlyLoggedInUserAllowed: true,
          auction: true,
          evenBuild: true,
          noRentCollectionInPrison: true,
          randomPlayerOrder: false,
          startingCash: 5000,
          vacationCashAllowed: true,
          currentVacationCash: 2000,
          x2RentOnFullSet: true,
        },
      },
    });

    const gameId = createGameResult.data.insert_monopoly_game_one.id;

    return res.json({ gameId });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
