/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMonopolyGameInput = {
  id?: string | null,
  players?: Array< MonopolyPlayerDataInput | null > | null,
  mapID: MonopolyMaps,
  currentPlayerTurn?: string | null,
  propertyData?: Array< MonopolyPropertyDataInput | null > | null,
  trades?: Array< MonopolyTradeDataInput | null > | null,
  isGameStarted?: boolean | null,
  isGameFinished?: boolean | null,
  maxPlayers?: number | null,
  onlyLoggedInUserAllowed?: boolean | null,
  privateRoom?: boolean | null,
  auction?: boolean | null,
  evenBuild?: boolean | null,
  noRentCollectionInPrison?: boolean | null,
  randomPlayerOrder?: boolean | null,
  startingCash?: number | null,
  vacationCashAllowed?: boolean | null,
  currentVacationCash?: number | null,
  x2RentOnFullSet?: boolean | null,
};

export type MonopolyPlayerDataInput = {
  id?: string | null,
  currentPosition?: string | null,
  availableCash?: number | null,
  isBankrupt?: boolean | null,
  sequence?: number | null,
};

export enum MonopolyMaps {
  CLASSIC_MAP = "CLASSIC_MAP",
}


export type MonopolyPropertyDataInput = {
  id: string,
  ownerId?: string | null,
  isPropertyMortgage?: boolean | null,
  housesCount?: number | null,
};

export type MonopolyTradeDataInput = {
  tradeBy?: string | null,
  tradeTo?: string | null,
  tradeId?: string | null,
  tradeDetails?: string | null,
};

export type ModelMonopolyGameConditionInput = {
  mapID?: ModelMonopolyMapsInput | null,
  currentPlayerTurn?: ModelStringInput | null,
  isGameStarted?: ModelBooleanInput | null,
  isGameFinished?: ModelBooleanInput | null,
  maxPlayers?: ModelIntInput | null,
  onlyLoggedInUserAllowed?: ModelBooleanInput | null,
  privateRoom?: ModelBooleanInput | null,
  auction?: ModelBooleanInput | null,
  evenBuild?: ModelBooleanInput | null,
  noRentCollectionInPrison?: ModelBooleanInput | null,
  randomPlayerOrder?: ModelBooleanInput | null,
  startingCash?: ModelIntInput | null,
  vacationCashAllowed?: ModelBooleanInput | null,
  currentVacationCash?: ModelIntInput | null,
  x2RentOnFullSet?: ModelBooleanInput | null,
  and?: Array< ModelMonopolyGameConditionInput | null > | null,
  or?: Array< ModelMonopolyGameConditionInput | null > | null,
  not?: ModelMonopolyGameConditionInput | null,
};

export type ModelMonopolyMapsInput = {
  eq?: MonopolyMaps | null,
  ne?: MonopolyMaps | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type MonopolyGame = {
  __typename: "MonopolyGame",
  id: string,
  players?:  Array<MonopolyPlayerData | null > | null,
  mapID: MonopolyMaps,
  currentPlayerTurn?: string | null,
  propertyData?:  Array<MonopolyPropertyData | null > | null,
  trades?:  Array<MonopolyTradeData | null > | null,
  isGameStarted?: boolean | null,
  isGameFinished?: boolean | null,
  maxPlayers?: number | null,
  onlyLoggedInUserAllowed?: boolean | null,
  privateRoom?: boolean | null,
  auction?: boolean | null,
  evenBuild?: boolean | null,
  noRentCollectionInPrison?: boolean | null,
  randomPlayerOrder?: boolean | null,
  startingCash?: number | null,
  vacationCashAllowed?: boolean | null,
  currentVacationCash?: number | null,
  x2RentOnFullSet?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type MonopolyPlayerData = {
  __typename: "MonopolyPlayerData",
  id?: string | null,
  currentPosition?: string | null,
  availableCash?: number | null,
  isBankrupt?: boolean | null,
  sequence?: number | null,
};

export type MonopolyPropertyData = {
  __typename: "MonopolyPropertyData",
  id: string,
  ownerId?: string | null,
  isPropertyMortgage?: boolean | null,
  housesCount?: number | null,
};

export type MonopolyTradeData = {
  __typename: "MonopolyTradeData",
  tradeBy?: string | null,
  tradeTo?: string | null,
  tradeId?: string | null,
  tradeDetails?: string | null,
};

export type UpdateMonopolyGameInput = {
  id: string,
  players?: Array< MonopolyPlayerDataInput | null > | null,
  mapID?: MonopolyMaps | null,
  currentPlayerTurn?: string | null,
  propertyData?: Array< MonopolyPropertyDataInput | null > | null,
  trades?: Array< MonopolyTradeDataInput | null > | null,
  isGameStarted?: boolean | null,
  isGameFinished?: boolean | null,
  maxPlayers?: number | null,
  onlyLoggedInUserAllowed?: boolean | null,
  privateRoom?: boolean | null,
  auction?: boolean | null,
  evenBuild?: boolean | null,
  noRentCollectionInPrison?: boolean | null,
  randomPlayerOrder?: boolean | null,
  startingCash?: number | null,
  vacationCashAllowed?: boolean | null,
  currentVacationCash?: number | null,
  x2RentOnFullSet?: boolean | null,
};

export type DeleteMonopolyGameInput = {
  id: string,
};

export type ModelMonopolyGameFilterInput = {
  id?: ModelIDInput | null,
  mapID?: ModelMonopolyMapsInput | null,
  currentPlayerTurn?: ModelStringInput | null,
  isGameStarted?: ModelBooleanInput | null,
  isGameFinished?: ModelBooleanInput | null,
  maxPlayers?: ModelIntInput | null,
  onlyLoggedInUserAllowed?: ModelBooleanInput | null,
  privateRoom?: ModelBooleanInput | null,
  auction?: ModelBooleanInput | null,
  evenBuild?: ModelBooleanInput | null,
  noRentCollectionInPrison?: ModelBooleanInput | null,
  randomPlayerOrder?: ModelBooleanInput | null,
  startingCash?: ModelIntInput | null,
  vacationCashAllowed?: ModelBooleanInput | null,
  currentVacationCash?: ModelIntInput | null,
  x2RentOnFullSet?: ModelBooleanInput | null,
  and?: Array< ModelMonopolyGameFilterInput | null > | null,
  or?: Array< ModelMonopolyGameFilterInput | null > | null,
  not?: ModelMonopolyGameFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelMonopolyGameConnection = {
  __typename: "ModelMonopolyGameConnection",
  items:  Array<MonopolyGame | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionMonopolyGameFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  mapID?: ModelSubscriptionStringInput | null,
  currentPlayerTurn?: ModelSubscriptionStringInput | null,
  isGameStarted?: ModelSubscriptionBooleanInput | null,
  isGameFinished?: ModelSubscriptionBooleanInput | null,
  maxPlayers?: ModelSubscriptionIntInput | null,
  onlyLoggedInUserAllowed?: ModelSubscriptionBooleanInput | null,
  privateRoom?: ModelSubscriptionBooleanInput | null,
  auction?: ModelSubscriptionBooleanInput | null,
  evenBuild?: ModelSubscriptionBooleanInput | null,
  noRentCollectionInPrison?: ModelSubscriptionBooleanInput | null,
  randomPlayerOrder?: ModelSubscriptionBooleanInput | null,
  startingCash?: ModelSubscriptionIntInput | null,
  vacationCashAllowed?: ModelSubscriptionBooleanInput | null,
  currentVacationCash?: ModelSubscriptionIntInput | null,
  x2RentOnFullSet?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionMonopolyGameFilterInput | null > | null,
  or?: Array< ModelSubscriptionMonopolyGameFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateMonopolyGameMutationVariables = {
  input: CreateMonopolyGameInput,
  condition?: ModelMonopolyGameConditionInput | null,
};

export type CreateMonopolyGameMutation = {
  createMonopolyGame?:  {
    __typename: "MonopolyGame",
    id: string,
    players?:  Array< {
      __typename: "MonopolyPlayerData",
      id?: string | null,
      currentPosition?: string | null,
      availableCash?: number | null,
      isBankrupt?: boolean | null,
      sequence?: number | null,
    } | null > | null,
    mapID: MonopolyMaps,
    currentPlayerTurn?: string | null,
    propertyData?:  Array< {
      __typename: "MonopolyPropertyData",
      id: string,
      ownerId?: string | null,
      isPropertyMortgage?: boolean | null,
      housesCount?: number | null,
    } | null > | null,
    trades?:  Array< {
      __typename: "MonopolyTradeData",
      tradeBy?: string | null,
      tradeTo?: string | null,
      tradeId?: string | null,
      tradeDetails?: string | null,
    } | null > | null,
    isGameStarted?: boolean | null,
    isGameFinished?: boolean | null,
    maxPlayers?: number | null,
    onlyLoggedInUserAllowed?: boolean | null,
    privateRoom?: boolean | null,
    auction?: boolean | null,
    evenBuild?: boolean | null,
    noRentCollectionInPrison?: boolean | null,
    randomPlayerOrder?: boolean | null,
    startingCash?: number | null,
    vacationCashAllowed?: boolean | null,
    currentVacationCash?: number | null,
    x2RentOnFullSet?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMonopolyGameMutationVariables = {
  input: UpdateMonopolyGameInput,
  condition?: ModelMonopolyGameConditionInput | null,
};

export type UpdateMonopolyGameMutation = {
  updateMonopolyGame?:  {
    __typename: "MonopolyGame",
    id: string,
    players?:  Array< {
      __typename: "MonopolyPlayerData",
      id?: string | null,
      currentPosition?: string | null,
      availableCash?: number | null,
      isBankrupt?: boolean | null,
      sequence?: number | null,
    } | null > | null,
    mapID: MonopolyMaps,
    currentPlayerTurn?: string | null,
    propertyData?:  Array< {
      __typename: "MonopolyPropertyData",
      id: string,
      ownerId?: string | null,
      isPropertyMortgage?: boolean | null,
      housesCount?: number | null,
    } | null > | null,
    trades?:  Array< {
      __typename: "MonopolyTradeData",
      tradeBy?: string | null,
      tradeTo?: string | null,
      tradeId?: string | null,
      tradeDetails?: string | null,
    } | null > | null,
    isGameStarted?: boolean | null,
    isGameFinished?: boolean | null,
    maxPlayers?: number | null,
    onlyLoggedInUserAllowed?: boolean | null,
    privateRoom?: boolean | null,
    auction?: boolean | null,
    evenBuild?: boolean | null,
    noRentCollectionInPrison?: boolean | null,
    randomPlayerOrder?: boolean | null,
    startingCash?: number | null,
    vacationCashAllowed?: boolean | null,
    currentVacationCash?: number | null,
    x2RentOnFullSet?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMonopolyGameMutationVariables = {
  input: DeleteMonopolyGameInput,
  condition?: ModelMonopolyGameConditionInput | null,
};

export type DeleteMonopolyGameMutation = {
  deleteMonopolyGame?:  {
    __typename: "MonopolyGame",
    id: string,
    players?:  Array< {
      __typename: "MonopolyPlayerData",
      id?: string | null,
      currentPosition?: string | null,
      availableCash?: number | null,
      isBankrupt?: boolean | null,
      sequence?: number | null,
    } | null > | null,
    mapID: MonopolyMaps,
    currentPlayerTurn?: string | null,
    propertyData?:  Array< {
      __typename: "MonopolyPropertyData",
      id: string,
      ownerId?: string | null,
      isPropertyMortgage?: boolean | null,
      housesCount?: number | null,
    } | null > | null,
    trades?:  Array< {
      __typename: "MonopolyTradeData",
      tradeBy?: string | null,
      tradeTo?: string | null,
      tradeId?: string | null,
      tradeDetails?: string | null,
    } | null > | null,
    isGameStarted?: boolean | null,
    isGameFinished?: boolean | null,
    maxPlayers?: number | null,
    onlyLoggedInUserAllowed?: boolean | null,
    privateRoom?: boolean | null,
    auction?: boolean | null,
    evenBuild?: boolean | null,
    noRentCollectionInPrison?: boolean | null,
    randomPlayerOrder?: boolean | null,
    startingCash?: number | null,
    vacationCashAllowed?: boolean | null,
    currentVacationCash?: number | null,
    x2RentOnFullSet?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetMonopolyGameQueryVariables = {
  id: string,
};

export type GetMonopolyGameQuery = {
  getMonopolyGame?:  {
    __typename: "MonopolyGame",
    id: string,
    players?:  Array< {
      __typename: "MonopolyPlayerData",
      id?: string | null,
      currentPosition?: string | null,
      availableCash?: number | null,
      isBankrupt?: boolean | null,
      sequence?: number | null,
    } | null > | null,
    mapID: MonopolyMaps,
    currentPlayerTurn?: string | null,
    propertyData?:  Array< {
      __typename: "MonopolyPropertyData",
      id: string,
      ownerId?: string | null,
      isPropertyMortgage?: boolean | null,
      housesCount?: number | null,
    } | null > | null,
    trades?:  Array< {
      __typename: "MonopolyTradeData",
      tradeBy?: string | null,
      tradeTo?: string | null,
      tradeId?: string | null,
      tradeDetails?: string | null,
    } | null > | null,
    isGameStarted?: boolean | null,
    isGameFinished?: boolean | null,
    maxPlayers?: number | null,
    onlyLoggedInUserAllowed?: boolean | null,
    privateRoom?: boolean | null,
    auction?: boolean | null,
    evenBuild?: boolean | null,
    noRentCollectionInPrison?: boolean | null,
    randomPlayerOrder?: boolean | null,
    startingCash?: number | null,
    vacationCashAllowed?: boolean | null,
    currentVacationCash?: number | null,
    x2RentOnFullSet?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMonopolyGamesQueryVariables = {
  filter?: ModelMonopolyGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMonopolyGamesQuery = {
  listMonopolyGames?:  {
    __typename: "ModelMonopolyGameConnection",
    items:  Array< {
      __typename: "MonopolyGame",
      id: string,
      mapID: MonopolyMaps,
      currentPlayerTurn?: string | null,
      isGameStarted?: boolean | null,
      isGameFinished?: boolean | null,
      maxPlayers?: number | null,
      onlyLoggedInUserAllowed?: boolean | null,
      privateRoom?: boolean | null,
      auction?: boolean | null,
      evenBuild?: boolean | null,
      noRentCollectionInPrison?: boolean | null,
      randomPlayerOrder?: boolean | null,
      startingCash?: number | null,
      vacationCashAllowed?: boolean | null,
      currentVacationCash?: number | null,
      x2RentOnFullSet?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMonopolyGameSubscriptionVariables = {
  filter?: ModelSubscriptionMonopolyGameFilterInput | null,
};

export type OnCreateMonopolyGameSubscription = {
  onCreateMonopolyGame?:  {
    __typename: "MonopolyGame",
    id: string,
    players?:  Array< {
      __typename: "MonopolyPlayerData",
      id?: string | null,
      currentPosition?: string | null,
      availableCash?: number | null,
      isBankrupt?: boolean | null,
      sequence?: number | null,
    } | null > | null,
    mapID: MonopolyMaps,
    currentPlayerTurn?: string | null,
    propertyData?:  Array< {
      __typename: "MonopolyPropertyData",
      id: string,
      ownerId?: string | null,
      isPropertyMortgage?: boolean | null,
      housesCount?: number | null,
    } | null > | null,
    trades?:  Array< {
      __typename: "MonopolyTradeData",
      tradeBy?: string | null,
      tradeTo?: string | null,
      tradeId?: string | null,
      tradeDetails?: string | null,
    } | null > | null,
    isGameStarted?: boolean | null,
    isGameFinished?: boolean | null,
    maxPlayers?: number | null,
    onlyLoggedInUserAllowed?: boolean | null,
    privateRoom?: boolean | null,
    auction?: boolean | null,
    evenBuild?: boolean | null,
    noRentCollectionInPrison?: boolean | null,
    randomPlayerOrder?: boolean | null,
    startingCash?: number | null,
    vacationCashAllowed?: boolean | null,
    currentVacationCash?: number | null,
    x2RentOnFullSet?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMonopolyGameSubscriptionVariables = {
  filter?: ModelSubscriptionMonopolyGameFilterInput | null,
};

export type OnUpdateMonopolyGameSubscription = {
  onUpdateMonopolyGame?:  {
    __typename: "MonopolyGame",
    id: string,
    players?:  Array< {
      __typename: "MonopolyPlayerData",
      id?: string | null,
      currentPosition?: string | null,
      availableCash?: number | null,
      isBankrupt?: boolean | null,
      sequence?: number | null,
    } | null > | null,
    mapID: MonopolyMaps,
    currentPlayerTurn?: string | null,
    propertyData?:  Array< {
      __typename: "MonopolyPropertyData",
      id: string,
      ownerId?: string | null,
      isPropertyMortgage?: boolean | null,
      housesCount?: number | null,
    } | null > | null,
    trades?:  Array< {
      __typename: "MonopolyTradeData",
      tradeBy?: string | null,
      tradeTo?: string | null,
      tradeId?: string | null,
      tradeDetails?: string | null,
    } | null > | null,
    isGameStarted?: boolean | null,
    isGameFinished?: boolean | null,
    maxPlayers?: number | null,
    onlyLoggedInUserAllowed?: boolean | null,
    privateRoom?: boolean | null,
    auction?: boolean | null,
    evenBuild?: boolean | null,
    noRentCollectionInPrison?: boolean | null,
    randomPlayerOrder?: boolean | null,
    startingCash?: number | null,
    vacationCashAllowed?: boolean | null,
    currentVacationCash?: number | null,
    x2RentOnFullSet?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMonopolyGameSubscriptionVariables = {
  filter?: ModelSubscriptionMonopolyGameFilterInput | null,
};

export type OnDeleteMonopolyGameSubscription = {
  onDeleteMonopolyGame?:  {
    __typename: "MonopolyGame",
    id: string,
    players?:  Array< {
      __typename: "MonopolyPlayerData",
      id?: string | null,
      currentPosition?: string | null,
      availableCash?: number | null,
      isBankrupt?: boolean | null,
      sequence?: number | null,
    } | null > | null,
    mapID: MonopolyMaps,
    currentPlayerTurn?: string | null,
    propertyData?:  Array< {
      __typename: "MonopolyPropertyData",
      id: string,
      ownerId?: string | null,
      isPropertyMortgage?: boolean | null,
      housesCount?: number | null,
    } | null > | null,
    trades?:  Array< {
      __typename: "MonopolyTradeData",
      tradeBy?: string | null,
      tradeTo?: string | null,
      tradeId?: string | null,
      tradeDetails?: string | null,
    } | null > | null,
    isGameStarted?: boolean | null,
    isGameFinished?: boolean | null,
    maxPlayers?: number | null,
    onlyLoggedInUserAllowed?: boolean | null,
    privateRoom?: boolean | null,
    auction?: boolean | null,
    evenBuild?: boolean | null,
    noRentCollectionInPrison?: boolean | null,
    randomPlayerOrder?: boolean | null,
    startingCash?: number | null,
    vacationCashAllowed?: boolean | null,
    currentVacationCash?: number | null,
    x2RentOnFullSet?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
