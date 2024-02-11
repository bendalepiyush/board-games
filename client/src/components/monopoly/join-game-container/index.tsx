import React from "react";
import styles from "./joinGameContainer.module.scss";
import Button from "@/components/button";

interface JoinGameContainerProps {
  hasJoinedGame: boolean;
  roomFull: boolean;
  selectedPlayerColor: string;
  userSelectedColors: string[];
  selectColor: (color: string) => void;
  joinGame: () => void;
}

const JoinGameContainer: React.FC<JoinGameContainerProps> = ({
  hasJoinedGame,
  roomFull,
  selectedPlayerColor,
  userSelectedColors,
  selectColor,
  joinGame,
}) => {
  return (
    <>
      {!hasJoinedGame && !roomFull && (
        <div className={styles.joinGameContainer}>
          <div className={styles.backgroundBlur}></div>
          <div className={styles.content}>
            <div className={styles.options}>
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className={`${styles.colorContainer} ${
                    selectedPlayerColor === color
                      ? styles.selectedColorContainer
                      : ""
                  } ${
                    userSelectedColors.includes(color) ? styles.disabled : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => selectColor(color)}
                />
              ))}
            </div>
            <Button onclick={joinGame}>Join Game</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinGameContainer;

const colorOptions = [
  "#bfda5b",
  "#fbc845",
  "#fe8541",
  "#c34848",
  "#5b9cdc",
  "#7fe7f5",
  "#069a8d",
  "#73e85d",
];
