import { gql } from "@apollo/client";

export const GAME_SUBSCRIPTION = gql`
  subscription gameSubscription($gameId: uuid!) {
    monopoly_game_by_pk(id: $gameId) {
      admin
      current_player_turn_id
      game_state
      id
      map
      roll_dice
      dice_values
      monopoly_game_participants {
        current_position
        available_cash
        id
        is_bankrupt
        player_id
        display_color
        player {
          status
          username
        }
      }
      player_sequence
      settings
      monopoly_participant_properties {
        id
        location
        player_id
        properties_owned
      }
    }
  }
`;
