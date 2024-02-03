import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { gql, useSubscription } from "@apollo/client";

import styles from "./style.module.scss";
import { makePostApiCall } from "@/js/api";

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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/auth/login");
    }

    const joinGame = async (gameId: string) => {
      try {
        const res = await makePostApiCall("api/monopoly/join-game", {
          gameId,
        });

        setRole(res.data.role);
        setCurrentUserId(res.data.id);
      } catch (error) {
        console.error("Error fetching game details:", error);
        router.push(
          `/auth/login?redirect=${encodeURIComponent(router.asPath)}`
        );
      }
    };

    if (id) {
      const gameId = Array.isArray(id) ? id[0] : id;
      setGameId(gameId);
      joinGame(gameId);
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
        monopoly_game_participants {
          current_position
          available_cash
          id
          is_bankrupt
          player_id
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
    if (data && data.monopoly_game_by_pk) {
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
    }

    if (data) {
      if (data.monopoly_game_by_pk) {
        console.log(data.monopoly_game_by_pk);

        if (data.monopoly_game_by_pk.game_state) {
          setGameState(data.monopoly_game_by_pk.game_state);
        }

        if (data.monopoly_game_by_pk.player_sequence) {
          setPlayerSequence(data.monopoly_game_by_pk.player_sequence);
        }

        if (data.monopoly_game_by_pk.current_player_turn_id) {
          setCurrentPlayerTurnId(
            data.monopoly_game_by_pk.current_player_turn_id
          );
        }

        if (data.monopoly_game_by_pk.roll_dice !== undefined) {
          setIsRollDice(data.monopoly_game_by_pk.roll_dice);
        }
      }
    }
  }, [data]);

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
      const res = await makePostApiCall("api/monopoly/roll-dice", {
        gameId,
      });
      setDiceValues({
        diceOne: res.data.diceValues[0],
        diceTwo: res.data.diceValues[1],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const endTurn = async () => {
    try {
      const res = await makePostApiCall("api/monopoly/end-turn", {
        gameId,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectRoute>
      <div className={styles.container}>
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
        />
        <div>
          {gameState === "CREATED" && (
            <GameSetting
              gameId={gameId}
              role={role}
              gameSettings={gameSettings}
            />
          )}
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
