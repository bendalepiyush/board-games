/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateMonopolyGame = /* GraphQL */ `subscription OnCreateMonopolyGame(
  $filter: ModelSubscriptionMonopolyGameFilterInput
) {
  onCreateMonopolyGame(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMonopolyGameSubscriptionVariables,
  APITypes.OnCreateMonopolyGameSubscription
>;
export const onUpdateMonopolyGame = /* GraphQL */ `subscription OnUpdateMonopolyGame(
  $filter: ModelSubscriptionMonopolyGameFilterInput
) {
  onUpdateMonopolyGame(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMonopolyGameSubscriptionVariables,
  APITypes.OnUpdateMonopolyGameSubscription
>;
export const onDeleteMonopolyGame = /* GraphQL */ `subscription OnDeleteMonopolyGame(
  $filter: ModelSubscriptionMonopolyGameFilterInput
) {
  onDeleteMonopolyGame(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMonopolyGameSubscriptionVariables,
  APITypes.OnDeleteMonopolyGameSubscription
>;
