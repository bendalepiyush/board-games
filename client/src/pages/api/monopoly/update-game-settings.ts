import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo";
import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";

const updateGameSettingMutation = gql`
  mutation updateGameSetting(
    $gameId: uuid!
    $adminId: uuid!
    $settings: json!
  ) {
    update_monopoly_game(
      where: { id: { _eq: $gameId }, _and: { admin: { _eq: $adminId } } }
      _set: { settings: $settings }
    ) {
      returning {
        id
        settings
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
    return res.status(400).json({ error: "id (userId) field missing." });
  }

  const userId = userInfo.id;

  const {
    gameId,
    privateRoom,
    auction,
    evenBuild,
    noRentCollectionInPrison,
    randomPlayerOrder,
    vacationCashAllowed,
    x2RentOnFullSet,
    maxPlayers,
  } = req.body;

  try {
    const updateGameSettingResp = await apolloClient.mutate({
      mutation: updateGameSettingMutation,
      variables: {
        gameId,
        adminId: userId,
        settings: {
          maxPlayers,
          privateRoom,
          onlyLoggedInUserAllowed: true,
          auction,
          evenBuild,
          noRentCollectionInPrison,
          randomPlayerOrder,
          startingCash: 5000,
          vacationCashAllowed,
          currentVacationCash: 2000,
          x2RentOnFullSet,
        },
      },
    });

    return res.json(updateGameSettingResp);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
