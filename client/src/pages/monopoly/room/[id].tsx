import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSubscription } from "@apollo/client";

import styles from "./style.module.scss";
import { makeRequest } from "@/js/api";
import { PlayersMap } from "@/maps/types";
import { ProtectRoute } from "@/components/protected-route";
import MonopolyBoard from "@/components/monopoly/board";
import GameSetting from "@/components/monopoly/game-setting";
import PlayersInfo from "@/components/monopoly/player-info";
import { Role, User } from "@/types/user";
import { GAME_SUBSCRIPTION } from "@/queries/gameSubscription";
import { GameData } from "@/types/monopolyGame";
import JoinGameContainer from "@/components/monopoly/join-game-container";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  const [role, setRole] = useState<Role>("VIEWER");
  const [gameId, setGameId] = useState<string>("");
  const [gameState, setGameState] = useState<string>("");
  const [startingCash, setStartingCash] = useState<number>(0);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentPlayerTurnId, setCurrentPlayerTurnId] = useState<string>("");
  const [isRollDice, setIsRollDice] = useState<boolean>(true);
  const [diceValues, setDiceValues] = useState({
    diceOne: 0,
    diceTwo: 0,
  });
  const [playersMap, setPlayersMap] = useState<PlayersMap>({});
  const [selectedPlayerColor, setSelectedPlayerColor] = useState<string>("");
  const [hasJoinedGame, setHasJoinedGame] = useState<boolean>(true);
  const [userSelectedColors, setUserSelectedColors] = useState<string[]>([]);
  const [roomFull, setRoomFull] = useState<boolean>(false);
  const [playerDetails, setPlayerDetails] = useState<User[]>([]);
  const [gameSettings, setGameSettings] = useState<{
    privateRoom: boolean;
    maxPlayers: number;
    x2RentOnFullSet: boolean;
    vacationCashAllowed: boolean;
    auction: boolean;
    noRentCollectionInPrison: boolean;
    evenBuild: boolean;
    randomPlayerOrder: boolean;
    startingCash: number;
  }>({
    privateRoom: true,
    maxPlayers: 4,
    x2RentOnFullSet: true,
    vacationCashAllowed: true,
    auction: true,
    noRentCollectionInPrison: true,
    evenBuild: true,
    randomPlayerOrder: true,
    startingCash: 0,
  });
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/auth/login");
    }

    if (id) {
      const gameId = Array.isArray(id) ? id[0] : id;
      setGameId(gameId);
    }

    const getUserDetails = async () => {
      try {
        const res = await makeRequest("api/auth/get-current-user");
        setCurrentUserId(res.data.id);
      } catch (error) {
        console.error(error);
        // router.push(
        //   `/auth/login?redirect=${encodeURIComponent(router.asPath)}`
        // );
      }
    };

    getUserDetails();
  }, [id, router]);

  const { loading, error, data } = useSubscription(GAME_SUBSCRIPTION, {
    variables: {
      gameId,
    },
  });

  useEffect(() => {
    if (!data || !data.monopoly_game_by_pk) return;

    const gameData: GameData = data.monopoly_game_by_pk;

    console.log("gameData", gameData);

    const {
      monopoly_game_participants,
      settings,
      game_state,
      player_sequence,
      current_player_turn_id,
      roll_dice,
      dice_values,
      admin,
    } = gameData;

    const playerMap: PlayersMap = {};
    const choosenColors: string[] = [];
    const playersInfo: User[] = [];

    monopoly_game_participants.forEach((p) => {
      const { current_position, id, display_color, player, player_id } = p;
      const isAdmin = player_id === admin;

      choosenColors.push(display_color);

      const playerObj = {
        color: display_color,
        name: player.username,
        id,
      };

      playerMap[current_position] = playerMap[current_position] || [];
      playerMap[current_position].push(playerObj);

      playersInfo.push({
        displayColor: display_color,
        username: player.username,
        isAdmin,
      });
    });

    setPlayersMap(playerMap);
    setUserSelectedColors(choosenColors);
    setPlayerDetails(playersInfo);
    setGameSettings(settings);
    setGameState(game_state);
    setPlayerSequence(player_sequence);
    setCurrentPlayerTurnId(current_player_turn_id);
    setIsRollDice(roll_dice !== undefined ? roll_dice : false);

    if (dice_values) {
      const [diceOne, diceTwo] = dice_values;
      setDiceValues({ diceOne, diceTwo });
    }

    const hasJoinedGame = player_sequence.includes(currentUserId);
    setHasJoinedGame(hasJoinedGame);

    let role: Role = "VIEWER";
    if (admin === currentUserId) {
      role = "ADMIN";
    } else if (hasJoinedGame) {
      role = "PARTICIPANT";
    }

    setRole(role);

    const roomFull = player_sequence.length === settings.maxPlayers;
    setRoomFull(roomFull);
  }, [data, currentUserId]);

  // Responsive Mangement
  useEffect(() => {}, []);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  const startGame = async () => {
    try {
      await makeRequest("api/monopoly/start-game", {
        startingCash: gameSettings.startingCash,
        gameId,
        playerIds: playerSequence,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const rollDice = async () => {
    try {
      await makeRequest("api/monopoly/roll-dice", {
        gameId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const endTurn = async () => {
    try {
      await makeRequest("api/monopoly/end-turn", {
        gameId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const joinGame = async () => {
    try {
      const res = await makeRequest("api/monopoly/join-game", {
        gameId,
        displayColor: selectedPlayerColor,
      });

      setRole(res.data.role);
    } catch (error) {
      console.error(error);
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  };

  const selectColor = (color: string) => {
    if (userSelectedColors.includes(color)) {
      console.log("Already selected");
    } else {
      setSelectedPlayerColor(color);
    }
  };

  return (
    <ProtectRoute>
      <div className={styles.container} ref={ref}>
        <JoinGameContainer
          hasJoinedGame={hasJoinedGame}
          roomFull={roomFull}
          selectedPlayerColor={selectedPlayerColor}
          userSelectedColors={userSelectedColors}
          selectColor={selectColor}
          joinGame={joinGame}
        />

        <div>Left Section</div>
        <MonopolyBoard
          startGame={startGame}
          gameState={gameState}
          rollDice={rollDice}
          endTurn={endTurn}
          gameSettings={{
            userId: currentUserId,
            cureentPlayerTurnId: currentPlayerTurnId,
            rollDice: isRollDice,
          }}
          diceValues={diceValues}
          playersMap={playersMap}
        />
        <div>
          {gameState === "CREATED" && (
            <>
              <PlayersInfo data={playerDetails} />
              <GameSetting
                gameId={gameId}
                role={role}
                gameSettings={gameSettings}
              />
            </>
          )}
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
