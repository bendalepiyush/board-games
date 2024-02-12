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
import { GameData, Game } from "@/types/monopolyGame";
import JoinGameContainer from "@/components/monopoly/join-game-container";
import { DEFAULT_MONOPOLY_GAME_INFO } from "@/js/constant";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  const [game, setGame] = useState<Game>(DEFAULT_MONOPOLY_GAME_INFO);
  const [gameId, setGameId] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [selectedPlayerColor, setSelectedPlayerColor] = useState<string>("");

  const [gridTemplate, setGridTemplate] = useState<string>("");

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
        setCurrentUserId(res.data.userId);
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
      monopoly_participant_properties,
    } = gameData;

    const playerMap: PlayersMap = {};
    const choosenColors: string[] = [];
    const playersInfo: User[] = [];
    const playersInfoTempMap: {
      [key: string]: User;
    } = {};

    monopoly_game_participants.forEach((p) => {
      const {
        current_position,
        id,
        display_color,
        player,
        player_id,
        available_cash,
      } = p;

      const isAdmin = player_id === admin;

      choosenColors.push(display_color);

      const playerObj = {
        color: display_color,
        name: player.username,
        id,
        playerId: player_id,
      };

      playerMap[current_position] = playerMap[current_position] || [];
      playerMap[current_position].push(playerObj);

      playersInfoTempMap[player_id] = {
        displayColor: display_color,
        username: player.username,
        isAdmin,
        availableCash: available_cash,
        status: player.status,
        userId: player_id,
      };
    });

    player_sequence.forEach((playerId) => {
      playersInfo.push(playersInfoTempMap[playerId]);
    });

    const isRollDice = roll_dice !== undefined ? roll_dice : false;
    const [diceOne, diceTwo] = dice_values;
    const isRoomFull = player_sequence.length === settings.maxPlayers;

    const hasJoinedGame = player_sequence.includes(currentUserId);

    let role: Role = "VIEWER";
    if (admin === currentUserId) {
      role = "ADMIN";
    } else if (hasJoinedGame) {
      role = "PARTICIPANT";
    }

    let isAdmin = false;
    if (admin === currentUserId) {
      isAdmin = true;
    }

    const gameInfo: Game = {
      user: {
        hasJoinedGame,
        isAdmin,
        role,
      },
      settings,
      players: {
        location: playerMap,
        choosenColors: choosenColors,
        info: playersInfo,
        playerSequence: player_sequence,
        properties: monopoly_participant_properties,
      },
      state: game_state,
      currentPlayerTurn: current_player_turn_id,
      dice: {
        state: { diceOne, diceTwo },
        isRollDice,
      },
      isRoomFull,
    };

    console.log("gameInfo", gameInfo);

    setGame(gameInfo);
  }, [data, currentUserId]);

  // Responsive Mangement
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const width = ref.current?.offsetWidth || 50;
      const height = ref.current?.offsetHeight || 50;

      const smaller = width > height ? height : width;
      //const temp = `minmax(400px, 1fr) ${smaller}px minmax(400px, 1fr)`;
      const temp = `1fr 2fr 1fr`;

      setGridTemplate(temp);

      console.log(gridTemplate);
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        startingCash: game.settings.startingCash,
        gameId,
        playerIds: game.players.playerSequence,
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
      await makeRequest("api/monopoly/join-game", {
        gameId,
        displayColor: selectedPlayerColor,
      });
    } catch (error) {
      console.error(error);
      router.push(`/auth/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  };

  const selectColor = (color: string) => {
    if (game.players.choosenColors.includes(color)) {
      console.log("Already selected");
    } else {
      setSelectedPlayerColor(color);
    }
  };

  return (
    <ProtectRoute>
      <>
        <div
          className={styles.container}
          ref={ref}
          style={{ gridTemplateColumns: gridTemplate }}
        >
          <div>Left Section</div>
          <div className={styles.gameboard}>
            <JoinGameContainer
              hasJoinedGame={game.user.hasJoinedGame}
              roomFull={game.isRoomFull}
              selectedPlayerColor={selectedPlayerColor}
              userSelectedColors={game.players.choosenColors}
              selectColor={selectColor}
              joinGame={joinGame}
            />
            <MonopolyBoard
              endTurn={endTurn}
              rollDice={rollDice}
              startGame={startGame}
              game={game}
              currentUserId={currentUserId}
              gameId={gameId}
              blurOut={!game.user.hasJoinedGame}
            />
          </div>
          <div className={styles.rightSection}>
            <PlayersInfo game={game} />
            {game.state === "CREATED" && (
              <>
                <GameSetting
                  gameId={gameId}
                  role={game.user.role}
                  gameSettings={game.settings}
                />
              </>
            )}
          </div>
        </div>
      </>
    </ProtectRoute>
  );
};

export default Room;
