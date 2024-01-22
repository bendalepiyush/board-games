/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMonopolyGame = /* GraphQL */ `mutation CreateMonopolyGame(
  $input: CreateMonopolyGameInput!
  $condition: ModelMonopolyGameConditionInput
) {
  createMonopolyGame(input: $input, condition: $condition) {
    id
    players {
      id
      currentPosition
      availableCash
      isBankrupt
      sequence
      __typename
    }
    mapID
    currentPlayerTurn
    propertyData {
      id
      ownerId
      isPropertyMortgage
      housesCount
      __typename
    }
    trades {
      tradeBy
      tradeTo
      tradeId
      tradeDetails
      __typename
    }
    isGameStarted
    isGameFinished
    maxPlayers
    onlyLoggedInUserAllowed
    privateRoom
    auction
    evenBuild
    noRentCollectionInPrison
    randomPlayerOrder
    startingCash
    vacationCashAllowed
    currentVacationCash
    x2RentOnFullSet
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMonopolyGameMutationVariables,
  APITypes.CreateMonopolyGameMutation
>;
export const updateMonopolyGame = /* GraphQL */ `mutation UpdateMonopolyGame(
  $input: UpdateMonopolyGameInput!
  $condition: ModelMonopolyGameConditionInput
) {
  updateMonopolyGame(input: $input, condition: $condition) {
    id
    players {
      id
      currentPosition
      availableCash
      isBankrupt
      sequence
      __typename
    }
    mapID
    currentPlayerTurn
    propertyData {
      id
      ownerId
      isPropertyMortgage
      housesCount
      __typename
    }
    trades {
      tradeBy
      tradeTo
      tradeId
      tradeDetails
      __typename
    }
    isGameStarted
    isGameFinished
    maxPlayers
    onlyLoggedInUserAllowed
    privateRoom
    auction
    evenBuild
    noRentCollectionInPrison
    randomPlayerOrder
    startingCash
    vacationCashAllowed
    currentVacationCash
    x2RentOnFullSet
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMonopolyGameMutationVariables,
  APITypes.UpdateMonopolyGameMutation
>;
export const deleteMonopolyGame = /* GraphQL */ `mutation DeleteMonopolyGame(
  $input: DeleteMonopolyGameInput!
  $condition: ModelMonopolyGameConditionInput
) {
  deleteMonopolyGame(input: $input, condition: $condition) {
    id
    players {
      id
      currentPosition
      availableCash
      isBankrupt
      sequence
      __typename
    }
    mapID
    currentPlayerTurn
    propertyData {
      id
      ownerId
      isPropertyMortgage
      housesCount
      __typename
    }
    trades {
      tradeBy
      tradeTo
      tradeId
      tradeDetails
      __typename
    }
    isGameStarted
    isGameFinished
    maxPlayers
    onlyLoggedInUserAllowed
    privateRoom
    auction
    evenBuild
    noRentCollectionInPrison
    randomPlayerOrder
    startingCash
    vacationCashAllowed
    currentVacationCash
    x2RentOnFullSet
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMonopolyGameMutationVariables,
  APITypes.DeleteMonopolyGameMutation
>;
