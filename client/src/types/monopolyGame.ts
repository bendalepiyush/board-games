import { PlayersMap } from "@/maps/types";
import { Role, Status, User } from "./user";

export type GameState = "CREATED" | "STARTED" | "ENDED";

type Map = "classic_map";

type MonopolyGameParticipant = {
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
