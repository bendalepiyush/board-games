/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import styles from "./style.module.scss";
import CardCorner from "../card-corner";
import CardCountry from "../card-country";
import CardSurprise from "../card-surprise";
import { CLASSIC_MAP } from "@/maps/classic-map";
import CardCompany from "../card-company";
import { PlayersMap } from "@/maps/types";
import { Property } from "@/types/monopolyGame";
import { makeRequest } from "@/js/api";
import {
  MONOPOLY_CLASSIC_PROPERTY_MAP,
  TRADEABLE_LOCATION,
} from "@/js/constant";

type MonopolyBoardProps = {
  startGame: () => void;
  gameState: string;
  rollDice: () => void;
  endTurn: () => void;
  gameSettings: {
    userId: string;
    cureentPlayerTurnId: string;
    rollDice: boolean;
    isAdmin: boolean;
  };
  diceValues: {
    diceOne: number;
    diceTwo: number;
  };
  playersMap: PlayersMap;
  properties: Property[];
  currentUserId: string;
  gameId: string;
};

const MonopolyBoard: React.FC<MonopolyBoardProps> = ({
  startGame,
  gameState,
  rollDice,
  gameSettings,
  endTurn,
  diceValues,
  playersMap,
  properties,
  currentUserId,
  gameId,
}) => {
  const [isEligibleForTrade, setIsEligibleForTrade] = useState(false);
  const [price, setPrice] = useState(0);
  const [currLocation, setCurrLocation] = useState(0);

  useEffect(() => {
    const tradedLocations: number[] = [];
    const locationsOwnedByOthers: number[] = [];

    properties.forEach((prop: { player_id: string; location: number }) => {
      tradedLocations.push(prop.location);

      if (prop.player_id !== currentUserId) {
        locationsOwnedByOthers.push(prop.location);
      }
    });

    let currentLocation = 0;

    Object.keys(playersMap).forEach((k) => {
      const index = parseInt(k);

      if (playersMap[index][0].playerId === currentUserId) {
        currentLocation = parseInt(k);
      }
    });

    setCurrLocation(currentLocation);

    let canTrade = false;
    if (
      TRADEABLE_LOCATION.includes(currentLocation) &&
      !tradedLocations.includes(currentLocation)
    ) {
      canTrade = true;

      setPrice(MONOPOLY_CLASSIC_PROPERTY_MAP[currentLocation].price.base);
    }

    setIsEligibleForTrade(canTrade);
  }, [properties, currentUserId, playersMap, currLocation]);

  const buyProp = async () => {
    try {
      await makeRequest("api/monopoly/buy-prop", {
        gameId,
        location: currLocation,
        propertiesOwned: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
                position={item.position}
                playersMap={playersMap}
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
                position={item.position}
                playersMap={playersMap}
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
                position={item.position}
                playersMap={playersMap}
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
                position={item.position}
                playersMap={playersMap}
              />
            </div>
          );
        }

        if (item.type === "Center") {
          return (
            <div
              key={index}
              className={styles.centerCard}
              style={{
                order: item.order,
                gridRowStart: item.gridSpan,
                gridColumnStart: item.gridSpan,
              }}
            >
              {gameState === "CREATED" && gameSettings.isAdmin && (
                <button onClick={startGame}>Start Game</button>
              )}
              {gameState === "STARTED" &&
                gameSettings.userId === gameSettings.cureentPlayerTurnId &&
                (gameSettings.rollDice ? (
                  <button onClick={rollDice}>Roll the dice</button>
                ) : (
                  <>
                    <button onClick={endTurn}>End Turn</button>
                    {isEligibleForTrade && (
                      <button onClick={buyProp}>Buy for ${price}</button>
                    )}
                  </>
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
