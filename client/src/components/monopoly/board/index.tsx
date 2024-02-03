/* eslint-disable @next/next/no-img-element */
import React from "react";

import styles from "./style.module.scss";
import CardCorner from "../card-corner";
import CardCountry from "../card-country";
import CardSurprise from "../card-surprise";
import { CLASSIC_MAP } from "@/maps/classic-map";
import CardCompany from "../card-company";

type MonopolyBoardProps = {
  startGame: () => void;
  gameState: string;
  rollDice: () => void;
  endTurn: () => void;
  gameSettings: {
    userId: string;
    cureentPlayerTurnId: string;
    rollDice: boolean;
  };
  diceValues: {
    diceOne: number;
    diceTwo: number;
  };
};

const MonopolyBoard: React.FC<MonopolyBoardProps> = ({
  startGame,
  gameState,
  rollDice,
  gameSettings,
  endTurn,
  diceValues,
}) => {
  return (
    <div className={styles.container}>
      {CLASSIC_MAP.map((item, index) => {
        if (item.type === "Country") {
          return (
            <div
              key={index}
              style={{
                order: item.order,
              }}
              className={styles.singleCard}
            >
              <CardCountry
                backgroundImageUrl={item.backgroundImageUrl}
                countryLogo={item.countryLogo}
                title={item.title}
                price={item.price}
                cardPosition={item.cardPosition}
                type={item.type}
                order={item.order}
              />
            </div>
          );
        }

        if (item.type === "Company") {
          return (
            <div
              key={index}
              style={{
                order: item.order,
              }}
              className={styles.singleCard}
            >
              <CardCompany
                backgroundImageUrl={item.backgroundImageUrl}
                countryLogo={item.countryLogo}
                title={item.title}
                price={item.price}
                cardPosition={item.cardPosition}
                type={item.type}
                order={item.order}
              />
            </div>
          );
        }

        if (item.type === "Surprise") {
          return (
            <div
              key={index}
              style={{
                order: item.order,
              }}
              className={styles.singleCard}
            >
              <CardSurprise
                imagePath={item.imagePath}
                title={item.title}
                cardPosition={item.cardPosition}
                type={item.type}
                order={item.order}
              />
            </div>
          );
        }

        if (item.type === "Corner Card" && item.title == "jail") {
          return (
            <div
              key={index}
              className={styles.jail}
              style={{
                order: item.order,
              }}
            >
              {/* <p>Passing By</p>
              <div className={styles.prison}>
                <img src={item.imagePath} alt="Image" />
                <p>In Jail</p>
              </div> */}
            </div>
          );
        }

        if (item.type === "Corner Card") {
          return (
            <div
              key={index}
              style={{
                order: item.order,
              }}
              className={styles.singleCard}
            >
              <CardCorner
                imagePath={item.imagePath}
                title={item.title}
                type={item.type}
                order={item.order}
              />
            </div>
          );
        }

        if (item.type === "Center") {
          return (
            <div
              key={index}
              className={styles.singleCard}
              style={{
                order: item.order,
                gridRowStart: item.gridSpan,
                gridColumnStart: item.gridSpan,
              }}
            >
              Center
              {gameState === "CREATED" && (
                <button onClick={startGame}>Start Game</button>
              )}
              {gameState === "STARTED" &&
                gameSettings.userId === gameSettings.cureentPlayerTurnId &&
                (gameSettings.rollDice ? (
                  <button onClick={rollDice}>Roll the dice</button>
                ) : (
                  <button onClick={endTurn}>End Turn</button>
                ))}
              <h1 style={{ color: "white", margin: "40px" }}>
                <span>{diceValues.diceOne}</span>
                <span> - </span>
                <span>{diceValues.diceTwo}</span>
              </h1>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MonopolyBoard;
