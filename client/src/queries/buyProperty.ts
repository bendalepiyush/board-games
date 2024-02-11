import { gql } from "@apollo/client";

export const BUY_PROPERTY = gql`
  mutation buyProperty(
    $gameId: uuid!
    $playerId: uuid!
    $propertiesOwned: Int!
    $location: Int!
  ) {
    insert_monopoly_participant_properties(
      objects: {
        properties_owned: $propertiesOwned
        player_id: $playerId
        game_id: $gameId
        location: $location
      }
    ) {
      returning {
        id
        player_id
        properties_owned
        game_id
      }
    }
  }
`;
