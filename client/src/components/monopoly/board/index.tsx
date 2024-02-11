/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import styles from "./style.module.scss";
import CardCorner from "../card-corner";
import CardCountry from "../card-country";
import CardSurprise from "../card-surprise";
import { CLASSIC_MAP } from "@/maps/classic-map";
import CardCompany from "../card-company";
import { Game } from "@/types/monopolyGame";
import { makeRequest } from "@/js/api";
import {
  MONOPOLY_CLASSIC_PROPERTY_MAP,
  TRADEABLE_LOCATION,
} from "@/js/constant";

type MonopolyBoardProps = {
  startGame: () => void;
  rollDice: () => void;
  endTurn: () => void;
  game: Game;
  currentUserId: string;
  gameId: string;
};

const MonopolyBoard: React.FC<MonopolyBoardProps> = ({
  startGame,
  rollDice,
  endTurn,
  game,
  currentUserId,
  gameId,
}) => {
  const [isEligibleForTrade, setIsEligibleForTrade] = useState(false);
  const [price, setPrice] = useState(0);
  const [currLocation, setCurrLocation] = useState(0);

  useEffect(() => {
    const tradedLocations: number[] = [];
    const locationsOwnedByOthers: number[] = [];

    game.players.properties.forEach(
      (prop: { player_id: string; location: number }) => {
        tradedLocations.push(prop.location);

        if (prop.player_id !== currentUserId) {
          locationsOwnedByOthers.push(prop.location);
        }
      }
    );

    let currentLocation = 0;

    const playersMap = game.players.location;
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
  }, [game.players.properties, currentUserId, game.players.location]);

  const buyProp = async () => {
    try {
      const currPlayer = game.players.info.find(
        (p) => p.userId === currentUserId
      );

      if (currPlayer) {
        const availableCash = currPlayer.availableCash - price;

        await makeRequest("api/monopoly/buy-prop", {
          gameId,
          location: currLocation,
          propertiesOwned: 0,
          availableCash,
        });
      }
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
                playersMap={game.players.location}
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
                playersMap={game.players.location}
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
                playersMap={game.players.location}
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
                playersMap={game.players.location}
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
              <span style={{ color: "white", margin: "40px" }}>
                <span>{game.dice.state.diceOne}</span>
                <span> - </span>
                <span>{game.dice.state.diceTwo}</span>
              </span>

              {game.state === "CREATED" && game.user.isAdmin && (
                <button onClick={startGame}>Start Game</button>
              )}

              {game.state === "STARTED" &&
                currentUserId === game.currentPlayerTurn &&
                (game.dice.isRollDice ? (
                  <button onClick={rollDice}>Roll the dice</button>
                ) : (
                  <>
                    <button onClick={endTurn}>End Turn</button>
                    {isEligibleForTrade && (
                      <button onClick={buyProp}>Buy for ${price}</button>
                    )}
                  </>
                ))}

              <div className={styles.gameFeed}></div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MonopolyBoard;
