import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { gql, useSubscription } from "@apollo/client";

import styles from "./style.module.scss";
import { makePostApiCall } from "@/js/api";
import { PlayersMap } from "@/maps/types";

import MonopolyBoard from "@/components/monopoly/board";
import { ProtectRoute } from "@/components/protected-route";
import GameSetting from "@/components/monopoly/game-setting";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  const [role, setRole] = useState<"ADMIN" | "VIEWER" | "PARTICIPANT">(
    "VIEWER"
  );
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/auth/login");
    }

    const getUserDetails = async () => {
      try {
        const res = await makePostApiCall("api/auth/get-current-user");

        console.log(res);

        // setRole(res.data.role);
        setCurrentUserId(res.data.id);
      } catch (error) {
        console.error("Error fetching game details:", error);
        router.push(
          `/auth/login?redirect=${encodeURIComponent(router.asPath)}`
        );
      }
    };

    getUserDetails();

    if (id) {
      const gameId = Array.isArray(id) ? id[0] : id;
      setGameId(gameId);
      // getGameDetails();
      // joinGame(gameId) ;
    }
  }, [id, router]);

  const gameSubscription = gql`
    subscription gameSubscription {
      monopoly_game_by_pk(id: "${gameId}") {
        admin
        current_player_turn_id
        game_state
        id
        map
        roll_dice
        dice_values
        monopoly_game_participants {
          current_position
          available_cash
          id
          is_bankrupt
          player_id
          display_color
          player {
            status
            username
          }
        }
        player_sequence
        settings
      }
    }
  `;

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

  const { loading, error, data } = useSubscription(gameSubscription);

  useEffect(() => {
    console.log(data);
    if (data && data.monopoly_game_by_pk) {
      const playerMap: PlayersMap = {};
      const choosenColors: string[] = [];

      data.monopoly_game_by_pk.monopoly_game_participants.forEach(
        (p: {
          current_position: number;
          id: string;
          display_color: string;
          player: { username: string };
        }) => {
          choosenColors.push(p.display_color);
          const playerObj = {
            color: p.display_color,
            name: p.player.username,
            id: p.id,
          };

          if (playerMap[p.current_position]) {
            playerMap[p.current_position].push(playerObj);
          } else {
            playerMap[p.current_position] = [playerObj];
          }
        }
      );

      setPlayersMap(playerMap);
      setUserSelectedColors(choosenColors);

      const {
        privateRoom,
        maxPlayers,
        x2RentOnFullSet,
        vacationCashAllowed,
        auction,
        noRentCollectionInPrison,
        evenBuild,
        randomPlayerOrder,
        startingCash,
      } = data.monopoly_game_by_pk.settings;

      setGameSettings({
        privateRoom,
        maxPlayers,
        x2RentOnFullSet,
        vacationCashAllowed,
        auction,
        noRentCollectionInPrison,
        evenBuild,
        randomPlayerOrder,
        startingCash,
      });

      if (data.monopoly_game_by_pk.game_state) {
        setGameState(data.monopoly_game_by_pk.game_state);
      }

      if (data.monopoly_game_by_pk.player_sequence) {
        setPlayerSequence(data.monopoly_game_by_pk.player_sequence);
      }

      if (data.monopoly_game_by_pk.current_player_turn_id) {
        setCurrentPlayerTurnId(data.monopoly_game_by_pk.current_player_turn_id);
      }

      if (data.monopoly_game_by_pk.roll_dice !== undefined) {
        setIsRollDice(data.monopoly_game_by_pk.roll_dice);
      }

      if (data.monopoly_game_by_pk.dice_values) {
        setDiceValues({
          diceOne: data.monopoly_game_by_pk.dice_values[0],
          diceTwo: data.monopoly_game_by_pk.dice_values[1],
        });
      }

      if (data.monopoly_game_by_pk.player_sequence) {
        if (data.monopoly_game_by_pk.player_sequence.includes(currentUserId)) {
          setHasJoinedGame(true);
        } else {
          setHasJoinedGame(false);
        }

        if (data.monopoly_game_by_pk.admin) {
          if (data.monopoly_game_by_pk.admin === currentUserId) {
            setRole("ADMIN");
          } else if (
            data.monopoly_game_by_pk.player_sequence.includes(currentUserId)
          ) {
            setRole("PARTICIPANT");
          } else {
            setRole("VIEWER");
          }
        }

        if (
          data.monopoly_game_by_pk.player_sequence.length ===
          data.monopoly_game_by_pk.settings.maxPlayers
        ) {
          setRoomFull(true);
        } else {
          setRoomFull(false);
        }
      }
    }
  }, [data, currentUserId]);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  const startGame = async () => {
    try {
      await makePostApiCall("api/monopoly/start-game", {
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
      await makePostApiCall("api/monopoly/roll-dice", {
        gameId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const endTurn = async () => {
    try {
      await makePostApiCall("api/monopoly/end-turn", {
        gameId,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const joinGame = async () => {
    try {
      const res = await makePostApiCall("api/monopoly/join-game", {
        gameId,
        displayColor: selectedPlayerColor,
      });

      setRole(res.data.role);
    } catch (error) {
      console.error("Error fetching game details:", error);
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  };

  const selectColor = (color: string) => {
    if (userSelectedColors.includes(color)) {
      console.log("Oops! Already selected");
    } else {
      setSelectedPlayerColor(color);
    }
  };

  return (
    <ProtectRoute>
      <div className={styles.container}>
        {hasJoinedGame === false && roomFull === false && (
          <div className={styles.joinGameContainer}>
            <div style={{ height: "100px", textAlign: "center" }}>
              <div
                className={`${styles.colorContainer} 
                ${
                  selectedPlayerColor === "#bfda5b"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#bfda5b") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#bfda5b" }}
                onClick={() => selectColor("#bfda5b")}
              />
              <div
                className={`${styles.colorContainer} ${
                  selectedPlayerColor === "#fbc845"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#fbc845") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#fbc845" }}
                onClick={() => selectColor("#fbc845")}
              />
              <div
                className={`${styles.colorContainer} ${
                  selectedPlayerColor === "#fe8541"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#fe8541") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#fe8541" }}
                onClick={() => selectColor("#fe8541")}
              />
              <div
                className={`${styles.colorContainer} ${
                  selectedPlayerColor === "#c34848"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#c34848") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#c34848" }}
                onClick={() => selectColor("#c34848")}
              />
              <div
                className={`${styles.colorContainer} ${
                  selectedPlayerColor === "#5b9cdc"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#5b9cdc") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#5b9cdc" }}
                onClick={() => selectColor("#5b9cdc")}
              />
              <div
                className={`${styles.colorContainer} ${
                  selectedPlayerColor === "#7fe7f5"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#7fe7f5") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#7fe7f5" }}
                onClick={() => selectColor("#7fe7f5")}
              />
              <div
                className={`${styles.colorContainer} ${
                  selectedPlayerColor === "#069a8d"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#069a8d") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#069a8d" }}
                onClick={() => selectColor("#069a8d")}
              />
              <div
                className={`${styles.colorContainer} ${
                  selectedPlayerColor === "#73e85d"
                    ? styles.selectedColorContainer
                    : ""
                }
                ${userSelectedColors.includes("#73e85d") ? styles.disabled : ""}
                `}
                style={{ backgroundColor: "#73e85d" }}
                onClick={() => selectColor("#73e85d")}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={joinGame}>Join Game</button>
            </div>
          </div>
        )}

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
              <h1>Players</h1>
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
