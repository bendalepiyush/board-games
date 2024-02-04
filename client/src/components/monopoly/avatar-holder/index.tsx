import React, { useState, useEffect } from "react";

import styles from "./style.module.scss";
import Avatar from "../avatar";
import { isCardHorizontal } from "@/js/util";

interface Player {
  color: string;
  name: string;
  id: string;
}

interface AvatarHolderProps {
  players: Player[];
  position: number;
}

const AvatarHolder: React.FC<AvatarHolderProps> = ({ players, position }) => {
  const [avatarHolderHeight, setAvatarHolderHeight] = useState(0);
  const [isHorizontalCard, setIsHorizontalCard] = useState(false);

  const AVATAR_LENGTH = 30;
  useEffect(() => {
    setIsHorizontalCard(isCardHorizontal(position));

    setAvatarHolderHeight(
      players.length * (AVATAR_LENGTH / 2) + AVATAR_LENGTH / 2
    );
  }, [players, position]);

  return (
    <div className={styles.avatarContainer}>
      <div
        className={styles.avatarHolder}
        style={{
          height: `${isHorizontalCard ? AVATAR_LENGTH : avatarHolderHeight}px`,
          width: `${isHorizontalCard ? avatarHolderHeight : AVATAR_LENGTH}px`,
        }}
      >
        {players.map((p, index) => (
          <Avatar
            key={index}
            containerLength={AVATAR_LENGTH}
            topOffset={index * (AVATAR_LENGTH / 2)}
            color={p.color}
            isHorizontalCard={isHorizontalCard}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarHolder;
