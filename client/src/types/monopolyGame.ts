import { Status } from "./user";

type GameState = "CREATED" | "STARTED" | "ENDED";

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
};
