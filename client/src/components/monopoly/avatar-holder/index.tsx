import React, { useState, useEffect } from "react";

import styles from "./style.module.scss";
import Avatar from "../avatar";

interface Player {
  color: string;
  name: string;
  id: string;
}

interface AvatarHolderProps {
  players: Player[];
}

const AvatarHolder: React.FC<AvatarHolderProps> = ({ players }) => {
  const [avatarHolderHeight, setAvatarHolderHeight] = useState(0);

  const AVATAR_LENGTH = 30;
  useEffect(() => {
    setAvatarHolderHeight(
      players.length * (AVATAR_LENGTH / 2) + AVATAR_LENGTH / 2
    );
  }, [players]);

  return (
    <div className={styles.avatarContainer}>
      <div
        className={styles.avatarHolder}
        style={{
          height: `${avatarHolderHeight}px`,
          width: `${AVATAR_LENGTH}px`,
        }}
      >
        {players.map((p, index) => (
          <Avatar
            key={index}
            containerLength={AVATAR_LENGTH}
            topOffset={index * (AVATAR_LENGTH / 2)}
            color={p.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarHolder;
