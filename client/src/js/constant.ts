import { MonopolyGameClassicPropMap } from "@/maps/types";
import { Game } from "@/types/monopolyGame";

export const BASE_URL = "http://localhost:3000";

export const DEFAULT_MONOPOLY_GAME_INFO: Game = {
  user: {
    hasJoinedGame: false,
    isAdmin: false,
    role: "VIEWER",
  },
  players: {
    location: [],
    choosenColors: [],
    info: [],
    playerSequence: [],
    properties: [],
  },
  settings: {
    privateRoom: true,
    maxPlayers: 4,
    x2RentOnFullSet: true,
    vacationCashAllowed: true,
    auction: true,
    noRentCollectionInPrison: true,
    evenBuild: true,
    randomPlayerOrder: true,
    startingCash: 0,
  },
  state: "CREATED",
  currentPlayerTurn: "",
  dice: {
    state: {
      diceOne: 0,
      diceTwo: 0,
    },
    isRollDice: false,
  },
  isRoomFull: false,
};

export const TRADEABLE_LOCATION = [
  2, 4, 6, 7, 9, 10, 12, 13, 14, 15, 16, 17, 19, 20, 22, 24, 25, 26, 27, 28, 29,
  30, 32, 33, 35, 36, 38, 40,
];

export const MONOPOLY_CLASSIC_PROPERTY_MAP: MonopolyGameClassicPropMap = {
  2: {
    price: {
      base: 60,
    },
  },
  4: {
    price: {
      base: 60,
    },
  },
  6: {
    price: {
      base: 200,
    },
  },
  7: {
    price: {
      base: 100,
    },
  },
  9: {
    price: {
      base: 100,
    },
  },
  10: {
    price: {
      base: 120,
    },
  },
  12: {
    price: {
      base: 140,
    },
  },
  13: {
    price: {
      base: 150,
    },
  },
  14: {
    price: {
      base: 140,
    },
  },
  15: {
    price: {
      base: 160,
    },
  },
  16: {
    price: {
      base: 200,
    },
  },
  17: {
    price: {
      base: 180,
    },
  },
  19: {
    price: {
      base: 180,
    },
  },
  20: {
    price: {
      base: 200,
    },
  },
  22: {
    price: {
      base: 220,
    },
  },
  24: {
    price: {
      base: 220,
    },
  },
  25: {
    price: {
      base: 240,
    },
  },
  26: {
    price: {
      base: 200,
    },
  },
  27: {
    price: {
      base: 260,
    },
  },
  28: {
    price: {
      base: 260,
    },
  },
  29: {
    price: {
      base: 150,
    },
  },
  30: {
    price: {
      base: 280,
    },
  },
  32: {
    price: {
      base: 300,
    },
  },
  33: {
    price: {
      base: 300,
    },
  },
  35: {
    price: {
      base: 320,
    },
  },
  36: {
    price: {
      base: 200,
    },
  },
  38: {
    price: {
      base: 350,
    },
  },
  40: {
    price: {
      base: 350,
    },
  },
};
