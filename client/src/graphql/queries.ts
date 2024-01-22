/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getMonopolyGame = /* GraphQL */ `query GetMonopolyGame($id: ID!) {
  getMonopolyGame(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMonopolyGameQueryVariables,
  APITypes.GetMonopolyGameQuery
>;
export const listMonopolyGames = /* GraphQL */ `query ListMonopolyGames(
  $filter: ModelMonopolyGameFilterInput
  $limit: Int
  $nextToken: String
) {
  listMonopolyGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      mapID
      currentPlayerTurn
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMonopolyGamesQueryVariables,
  APITypes.ListMonopolyGamesQuery
>;
