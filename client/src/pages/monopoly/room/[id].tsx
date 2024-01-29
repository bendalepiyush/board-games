import { ProtectRoute } from "@/components/protected-route";
import styles from "./style.module.scss";
import MonopolyBoard from "@/components/monopoly/board";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const joinGame = async (gameId: string) => {
      try {
        const res = await axios.post(
          "/api/monopoly/join-game",
          {
            gameId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(res);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    if (id) {
      const gameId = Array.isArray(id) ? id[0] : id;
      joinGame(gameId);
    }
  }, [id]);

  return (
    <ProtectRoute>
      <div className={styles.container}>
        <div>Left Section</div>
        <MonopolyBoard />
        <div>Right Section</div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
