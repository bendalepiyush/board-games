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
        <h2 className={styles.title}>Waiting for players...</h2>
      ) : (
        data.map((u, index) => {
          return (
            <div className={styles.userContainer} key={index}>
              <div
                className={`${styles.colorContainer}`}
                style={{ backgroundColor: u.displayColor }}
              />
              <h2 className={styles.user}>{u.username}</h2>
              {u.isAdmin && (
                <div className={styles.iconContainer}>
                  <FaCrown color="yellow" />
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default PlayersInfo;
