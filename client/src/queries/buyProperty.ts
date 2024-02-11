import { gql } from "@apollo/client";

export const BUY_PROPERTY = gql`
  mutation buyProperty(
    $gameId: uuid!
    $playerId: uuid!
    $propertiesOwned: Int!
    $location: Int!
    $availableCash: Int!
  ) {
    update_monopoly_game_participant(
      where: {
        game_id: { _eq: $gameId }
        _and: { player_id: { _eq: $playerId } }
      }
      _set: { available_cash: $availableCash }
    ) {
      returning {
        id
      }
    }

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
