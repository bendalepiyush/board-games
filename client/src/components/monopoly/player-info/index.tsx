import React from "react";
import { FaCrown } from "react-icons/fa";

import styles from "./style.module.scss";
import { Game } from "@/types/monopolyGame";

type PlayerInfoProps = {
  game: Game;
};

const PlayersInfo: React.FC<PlayerInfoProps> = ({ game }) => {
  return (
    <div className={styles.card}>
      {game.players.info.length === 0 ? (
        <p className={styles.title}>Waiting for players...</p>
      ) : (
        game.players.info.map((u, index) => {
          return (
            <div className={styles.userContainer} key={index}>
              <div className={styles.nameHolder}>
                <div
                  className={`${styles.colorContainer}`}
                  style={{ backgroundColor: u.displayColor }}
                />
                <span className={styles.user}>
                  {u.username}
                  {u.isAdmin && (
                    <FaCrown className={styles.iconContainer} color="yellow" />
                  )}
                </span>
              </div>
              <div>
                {game.state === "STARTED" && (
                  <span className={styles.user}>{`$ ${u.availableCash}`}</span>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PlayersInfo;
