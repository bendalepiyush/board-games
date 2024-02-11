import { gql } from "@apollo/client";

export const GET_GAME_DETAILS = gql`
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
