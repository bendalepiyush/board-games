import React from "react";
import { FaCrown } from "react-icons/fa";

import styles from "./style.module.scss";

type UserData = {
  displayColor: string;
  username: string;
  isAdmin: boolean;
};

type PlayerInfoProps = {
  data: UserData[];
};

const PlayersInfo: React.FC<PlayerInfoProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      {data.length === 0 ? (
        <p className={styles.title}>Waiting for players...</p>
      ) : (
        data.map((u, index) => {
          return (
            <div className={styles.userContainer} key={index}>
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
          );
        })
      )}
    </div>
  );
};

export default PlayersInfo;
