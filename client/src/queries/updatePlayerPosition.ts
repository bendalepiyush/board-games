import { gql } from "@apollo/client";

export const UPDATE_PLAYER_POSITION = gql`
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
