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
        monopoly_game_participants {
          current_position
          available_cash
          id
          is_bankrupt
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
  }>({
    privateRoom: true,
    maxPlayers: 4,
    x2RentOnFullSet: true,
    vacationCashAllowed: true,
    auction: true,
    noRentCollectionInPrison: true,
    evenBuild: true,
    randomPlayerOrder: true,
  });

  const { loading, error, data } = useSubscription(gameSubscription);

  useEffect(() => {
    if (data && data.monopoly_game_by_pk) {
      console.log(data.monopoly_game_by_pk.settings);

      const {
        privateRoom,
        maxPlayers,
        x2RentOnFullSet,
        vacationCashAllowed,
        auction,
        noRentCollectionInPrison,
        evenBuild,
        randomPlayerOrder,
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
      });
    }
  }, [data]);

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <ProtectRoute>
      <div className={styles.container}>
        <div>Left Section</div>
        <MonopolyBoard />
        <div>
          <GameSetting
            gameId={gameId}
            role={role}
            gameSettings={gameSettings}
          />
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
