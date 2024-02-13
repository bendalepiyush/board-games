import { Game, MonopolyGameClassicPropMap } from "@/types/monopolyGame";

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
    propertyMap: {},
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
    rent: {
      0: 2,
    },
  },
  4: {
    price: {
      base: 60,
    },
    rent: {
      0: 4,
    },
  },
  6: {
    price: {
      base: 200,
    },
    rent: {
      0: 25,
    },
  },
  7: {
    price: {
      base: 100,
    },
    rent: {
      0: 6,
    },
  },
  9: {
    price: {
      base: 100,
    },
    rent: {
      0: 6,
    },
  },
  10: {
    price: {
      base: 120,
    },
    rent: {
      0: 8,
    },
  },
  12: {
    price: {
      base: 140,
    },
    rent: {
      0: 10,
    },
  },
  13: {
    price: {
      base: 150,
    },
    rent: {
      0: 4,
    },
  },
  14: {
    price: {
      base: 140,
    },
    rent: {
      0: 10,
    },
  },
  15: {
    price: {
      base: 160,
    },
    rent: {
      0: 12,
    },
  },
  16: {
    price: {
      base: 200,
    },
    rent: {
      0: 25,
    },
  },
  17: {
    price: {
      base: 180,
    },
    rent: {
      0: 14,
    },
  },
  19: {
    price: {
      base: 180,
    },
    rent: {
      0: 14,
    },
  },
  20: {
    price: {
      base: 200,
    },
    rent: {
      0: 16,
    },
  },
  22: {
    price: {
      base: 220,
    },
    rent: {
      0: 18,
    },
  },
  24: {
    price: {
      base: 220,
    },
    rent: {
      0: 18,
    },
  },
  25: {
    price: {
      base: 240,
    },
    rent: {
      0: 20,
    },
  },
  26: {
    price: {
      base: 200,
    },
    rent: {
      0: 25,
    },
  },
  27: {
    price: {
      base: 260,
    },
    rent: {
      0: 22,
    },
  },
  28: {
    price: {
      base: 260,
    },
    rent: {
      0: 22,
    },
  },
  29: {
    price: {
      base: 150,
    },
    rent: {
      0: 4,
    },
  },
  30: {
    price: {
      base: 280,
    },
    rent: {
      0: 24,
    },
  },
  32: {
    price: {
      base: 300,
    },
    rent: {
      0: 26,
    },
  },
  33: {
    price: {
      base: 300,
    },
    rent: {
      0: 26,
    },
  },
  35: {
    price: {
      base: 320,
    },
    rent: {
      0: 27,
    },
  },
  36: {
    price: {
      base: 200,
    },
    rent: {
      0: 25,
    },
  },
  38: {
    price: {
      base: 350,
    },
    rent: {
      0: 35,
    },
  },
  40: {
    price: {
      base: 350,
    },
    rent: {
      0: 50,
    },
  },
};

export const PLACEHOLDER_UUID = "00000000-0000-0000-0000-000000000000";
