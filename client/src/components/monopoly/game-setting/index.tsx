import styles from "./style.module.scss";
import React, { useState } from "react";

import { makePostApiCall } from "@/js/api";
import Option from "@/components/monopoly/game-setting-option";

type GameSettingProps = {
  gameId: string;
  role: "ADMIN" | "VIEWER" | "PARTICIPANT";
  gameSettings: {
    privateRoom: boolean;
    maxPlayers: number;
    x2RentOnFullSet: boolean;
    vacationCashAllowed: boolean;
    auction: boolean;
    noRentCollectionInPrison: boolean;
    evenBuild: boolean;
    randomPlayerOrder: boolean;
  };
};

const GameSetting: React.FC<GameSettingProps> = ({
  gameId,
  role,
  gameSettings,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const maxPlayerOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ];

  const updateGameSettings = async (
    key:
      | "privateRoom"
      | "maxPlayers"
      | "x2RentOnFullSet"
      | "vacationCashAllowed"
      | "auction"
      | "noRentCollectionInPrison"
      | "evenBuild"
      | "randomPlayerOrder",
    currentValue: boolean | number
  ) => {
    const gameSettingsObj = {
      ...gameSettings,
    };

    if (
      (key === "privateRoom" ||
        key === "x2RentOnFullSet" ||
        key === "vacationCashAllowed" ||
        key === "auction" ||
        key === "noRentCollectionInPrison" ||
        key === "evenBuild" ||
        key === "randomPlayerOrder") &&
      typeof currentValue === "boolean"
    ) {
      gameSettingsObj[key] = currentValue;
    } else if (key === "maxPlayers" && typeof currentValue === "number") {
      gameSettingsObj[key] = currentValue;
    }

    try {
      setIsLoading(true);
      await makePostApiCall("api/monopoly/update-game-settings", {
        gameId,
        onlyLoggedInUserAllowed: true,
        startingCash: 5000,
        currentVacationCash: 2000,
        ...gameSettingsObj,
      });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ color: "white" }}>
      <div className={styles.card}>
        {isLoading && <div className={styles.loaderContainer}></div>}

        <h2 className={styles.title}>Game settings</h2>

        <Option
          mainText="Maximum players"
          subText="How many players can join the game"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("maxPlayers", value);
          }}
          icon="account-group"
          type="SELECT"
          selectOptions={maxPlayerOptions}
          selectedOption={gameSettings.maxPlayers}
        />

        <Option
          mainText="Private room"
          subText="Private rooms can be accessed using the room URL only"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("privateRoom", value);
          }}
          icon="key"
          type="SWITCH"
          active={gameSettings.privateRoom}
        />

        <div className={styles.divider} />

        <h2 className={styles.title}>Gameplay rules</h2>

        <Option
          mainText="x2 rent on full-set properties"
          subText="If a player owns a full property set, the base rent payment will be doubled"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("x2RentOnFullSet", value);
          }}
          icon="database"
          type="SWITCH"
          active={gameSettings.x2RentOnFullSet}
        />

        <Option
          mainText="Vacation cash"
          subText="If a player lands on Vacation, all collected money from taxes and bank payments will be earned"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("vacationCashAllowed", value);
          }}
          icon="vacation"
          type="SWITCH"
          active={gameSettings.vacationCashAllowed}
        />

        <Option
          mainText="Auction"
          subText="If someone skips purchasing the property landed on, it will be sold to the highest bidder"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("auction", value);
          }}
          icon="auction"
          type="SWITCH"
          active={gameSettings.auction}
        />

        <Option
          mainText="Don't collect rent while in prison"
          subText="Rent will not be collected when landing on properties whose owners are in prison"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("noRentCollectionInPrison", value);
          }}
          icon="house"
          type="SWITCH"
          active={gameSettings.noRentCollectionInPrison}
        />

        <Option
          mainText="Even build"
          subText="Houses and hotels must be built up and sold off evenly within a property set"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("evenBuild", value);
          }}
          icon="down-trend"
          type="SWITCH"
          active={gameSettings.evenBuild}
        />

        <Option
          mainText="Randomize player order"
          subText="Randomly reorder players at the beginning of the game"
          role={role}
          updateSetting={(value) => {
            updateGameSettings("randomPlayerOrder", value);
          }}
          icon="sync"
          type="SWITCH"
          active={gameSettings.randomPlayerOrder}
        />
      </div>
    </div>
  );
};

export default GameSetting;
