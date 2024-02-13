import { Role, Status, User } from "./user";

type CornerCardType = "Corner Card";
type CenterCardType = "Center";
type CountryCardType = "Country";
type CompanyCardType = "Company";
type SurpriseCardType = "Surprise";
type CardPosition = "top" | "bottom" | "left" | "right";

type Center = {
  type: CenterCardType;
  order: number;
  gridSpan: string;
  position: number;
};

type Player = {
  color: string;
  name: string;
  id: string;
  playerId: string;
};

export type PlayersMap = {
  [key: number]: Player[];
};

export type CornerCard = {
  imagePath: string;
  title: string;
  type: CornerCardType;
  order: number;
  position: number;
  playersMap: PlayersMap;
};

export type CountryCard = {
  backgroundImageUrl: string;
  countryLogo: string;
  title: string;
  price: string;
  cardPosition: CardPosition;
  type: CountryCardType;
  order: number;
  position: number;
  playersMap: PlayersMap;
  propertyMap: PropertyMap;
};

export type CompanyCard = {
  backgroundImageUrl: string;
  countryLogo: string;
  title: string;
  price: string;
  cardPosition: CardPosition;
  type: CompanyCardType;
  order: number;
  position: number;
  playersMap: PlayersMap;
  propertyMap: PropertyMap;
};

export type SurpriseCard = {
  imagePath: string;
  title: string;
  type: SurpriseCardType;
  cardPosition: CardPosition;
  order: number;
  position: number;
  playersMap: PlayersMap;
};

export type ClassicMapCard =
  | CountryCard
  | CornerCard
  | SurpriseCard
  | Center
  | CompanyCard;

export type MonopolyGameClassicPropMap = {
  [key: number]: {
    price: {
      base: number;
    };
    rent: {
      [key: number]: number;
    };
  };
};

export type GameState = "CREATED" | "STARTED" | "ENDED";

type Map = "classic_map";

export type MonopolyGameParticipant = {
  available_cash: number;
  current_position: number;
  display_color: string;
  id: string;
  is_bankrupt: boolean;
  player: {
    status: Status;
    username: string;
  };
  player_id: string;
};

type GameSettings = {
  auction: boolean;
  currentVacationCash: number;
  evenBuild: boolean;
  maxPlayers: number;
  noRentCollectionInPrison: boolean;
  onlyLoggedInUserAllowed: boolean;
  privateRoom: boolean;
  randomPlayerOrder: boolean;
  startingCash: number;
  vacationCashAllowed: boolean;
  x2RentOnFullSet: boolean;
};

export type Property = {
  location: number;
  properties_owned: number;
  player_id: string;
};

export type PropertyMap = {
  [key: number]: {
    color: string;
    playerId: string;
    propertiesOwned: number;
  };
};

export type GameData = {
  admin: string;
  current_player_turn_id: string;
  dice_values: [number, number];
  game_state: GameState;
  id: string;
  map: Map;
  monopoly_game_participants: MonopolyGameParticipant[];
  player_sequence: string[];
  roll_dice: boolean;
  settings: GameSettings;
  monopoly_participant_properties: Property[];
};

export type Game = {
  user: {
    hasJoinedGame: boolean;
    role: Role;
    isAdmin: boolean;
  };
  settings: {
    privateRoom: boolean;
    maxPlayers: number;
    x2RentOnFullSet: boolean;
    vacationCashAllowed: boolean;
    auction: boolean;
    noRentCollectionInPrison: boolean;
    evenBuild: boolean;
    randomPlayerOrder: boolean;
    startingCash: number;
  };
  players: {
    location: PlayersMap;
    choosenColors: string[];
    info: User[];
    playerSequence: string[];
    properties: Property[];
    propertyMap: PropertyMap;
  };
  state: GameState;
  currentPlayerTurn: string;
  isRoomFull: boolean;
  dice: {
    state: {
      diceOne: number;
      diceTwo: number;
    };
    isRollDice: boolean;
  };
};
