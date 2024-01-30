import { gql } from "@apollo/client";
import { apolloClient } from "@/apollo";
import { NextApiResponse } from "next";
import { authenticate } from "../middleware/auth";
import { ExtendedNextApiRequest } from "@/types/jwt";

const getGameDetailsQuery = gql`
  query GetUser($gameId: uuid!) {
    monopoly_game_by_pk(id: $gameId) {
      settings
      admin
      player_sequence
      game_state
    }
  }
`;

const addParticipantQuery = gql`
  mutation addParticipantQuery(
    $gameId: uuid!
    $playerId: uuid!
    $playerSequence: [uuid!]!
  ) {
    insert_monopoly_game_participant_one(
      object: { game_id: $gameId, player_id: $playerId }
    ) {
      id
    }

    update_monopoly_game_by_pk(
      pk_columns: { id: $gameId }
      _set: { player_sequence: $playerSequence }
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
      variables: { gameId },
    });

    if (data.monopoly_game_by_pk === null) {
      return res.status(400).json({ error: "Invalid gameId." });
    }

    let role = "VIEWER";

    if (data.monopoly_game_by_pk.admin === userId) {
      role = "ADMIN";
    } else if (data.monopoly_game_by_pk.player_sequence.includes(userId)) {
      role = "PARTICIPANT";
    }

    if (
      !data.monopoly_game_by_pk.player_sequence.includes(userId) &&
      data.monopoly_game_by_pk.player_sequence.length <
        data.monopoly_game_by_pk.settings.maxPlayers
    ) {
      await apolloClient.mutate({
        mutation: addParticipantQuery,
        variables: {
          gameId,
          playerId: userId,
          playerSequence: [...data.monopoly_game_by_pk.player_sequence, userId],
        },
      });
    }

    return res.status(200).json({ role });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export default authenticate(handler);
