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

  return (
    <ProtectRoute>
      <div className={styles.container}>
        <div>Left Section</div>
        <MonopolyBoard />
        <div>
          <GameSetting gameId={gameId} role={role} />
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
