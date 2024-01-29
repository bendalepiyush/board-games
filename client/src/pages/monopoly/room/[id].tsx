import { ProtectRoute } from "@/components/protected-route";
import styles from "./style.module.scss";
import MonopolyBoard from "@/components/monopoly/board";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import AccountGroupIcon from "@/components/icons/account-group";
import Switch from "@/components/monopoly/switch";
import { gql, useQuery, useSubscription } from "@apollo/client";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const joinGame = async (gameId: string) => {
      try {
        const res = await axios.post(
          "/api/monopoly/join-game",
          {
            gameId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(res);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    if (id) {
      const gameId = Array.isArray(id) ? id[0] : id;
      joinGame(gameId);
    }
  }, [id]);

  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  const selectOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ];

  const [privateRoom, setPrivateRoom] = useState<boolean>(true);
  const [auction, setAuction] = useState<boolean>(false);
  const [evenBuild, setEvenBuild] = useState<boolean>(false);
  const [noRentCollectionInPrison, setNoRentCollectionInPrison] =
    useState<boolean>(false);
  const [randomPlayerOrder, setRandomPlayerOrder] = useState<boolean>(false);
  const [vacationCashAllowed, setVacationCashAllowed] =
    useState<boolean>(false);
  const [x2RentOnFullSet, setX2RentOnFullSet] = useState<boolean>(false);

  const handlePrivateRoomToggle = () => {
    setPrivateRoom((prevSwitch) => !prevSwitch);
  };

  const handleAuctionToogle = () => {
    setAuction((prevSwitch) => !prevSwitch);
  };

  const handleEvenBuildToggle = () => {
    setEvenBuild((prevSwitch) => !prevSwitch);
  };

  const handleNoRentCollectionInPrisonToggle = () => {
    setNoRentCollectionInPrison((prevSwitch) => !prevSwitch);
  };

  const handleRandomPlayerOrderToggle = () => {
    setRandomPlayerOrder((prevSwitch) => !prevSwitch);
  };

  const handleVacationCashAllowedToggle = () => {
    setVacationCashAllowed((prevSwitch) => !prevSwitch);
  };

  const handleX2RentOnFullSetToggle = () => {
    setX2RentOnFullSet((prevSwitch) => !prevSwitch);
  };

  const options = [
    {
      mainText: "Private room",
      subText: "Private rooms can be accessed using the room URL only",
      handle: handlePrivateRoomToggle,
      state: privateRoom,
    },
    {
      mainText: "Auction",
      subText:
        "If someone skips purchasing the property landed on, it will be sold to the highest bidder",
      handle: handleAuctionToogle,
      state: auction,
    },
    {
      mainText: "Even build",
      subText:
        "Houses and hotels must be built up and sold off evenly within a property set",
      handle: handleEvenBuildToggle,
      state: evenBuild,
    },
    {
      mainText: "Don't collect rent while in prison",
      subText:
        "Rent will not be collected when landing on properties whose owners are in prison",
      handle: handleNoRentCollectionInPrisonToggle,
      state: noRentCollectionInPrison,
    },
    {
      mainText: "Randomize player order",
      subText: "Randomly reorder players at the beginning of the game",
      handle: handleRandomPlayerOrderToggle,
      state: randomPlayerOrder,
    },
    {
      mainText: "Vacation cash",
      subText:
        "If a player lands on Vacation, all collected money from taxes and bank payments will be earned",
      handle: handleVacationCashAllowedToggle,
      state: vacationCashAllowed,
    },
    {
      mainText: "x2 rent on full-set properties",
      subText:
        "If a player owns a full property set, the base rent payment will be doubled",
      handle: handleX2RentOnFullSetToggle,
      state: x2RentOnFullSet,
    },
  ];

  useEffect(() => {
    const syncSettings = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/monopoly/update-game-settings",
          {
            gameId: "f8c0f0bf-e94c-496e-a0cc-b4ede248316b",
            maxPlayers: 4,
            privateRoom: privateRoom,
            onlyLoggedInUserAllowed: true,
            auction: auction,
            evenBuild: evenBuild,
            noRentCollectionInPrison: noRentCollectionInPrison,
            randomPlayerOrder: randomPlayerOrder,
            startingCash: 5000,
            vacationCashAllowed: vacationCashAllowed,
            currentVacationCash: 2000,
            x2RentOnFullSet: x2RentOnFullSet,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };

    syncSettings();
  }, [
    privateRoom,
    auction,
    evenBuild,
    noRentCollectionInPrison,
    randomPlayerOrder,
    vacationCashAllowed,
    x2RentOnFullSet,
  ]);

  const gameSubscription = gql`
    subscription gameSubscription {
      monopoly_game(
        where: { id: { _eq: "f8c0f0bf-e94c-496e-a0cc-b4ede248316b" } }
      ) {
        settings
      }
    }
  `;

  const { loading, error, data } = useSubscription(gameSubscription);

  useEffect(() => {
    if (data && data.monopoly_game && data.monopoly_game.length > 0) {
      const newAuction = data.monopoly_game[0].settings.auction;
      console.log(newAuction);

      setAuction(newAuction);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  return (
    <ProtectRoute>
      <div className={styles.container}>
        <div>Left Section</div>
        <MonopolyBoard />
        <div style={{ color: "white" }}>
          <div className={styles.card}>
            <h2 className={styles.title}>
              Game settings - {data.monopoly_game[0].settings.auction}
            </h2>
            {/* <div className={styles.optionContainer}>
              <div className={styles.icon}>
                <AccountGroupIcon />
              </div>
              <div>
                <h3 className={styles.option}>Maximum players</h3>
                <p className={styles.subText}>
                  How many players can join the game
                </p>
              </div>
              <div>
                <select value={selectedOption} onChange={handleSelectChange}>
                  {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

            {options.map((option, index) => {
              return (
                <div className={styles.optionContainer} key={index}>
                  <div className={styles.icon}>
                    <AccountGroupIcon />
                  </div>
                  <div>
                    <h3 className={styles.option}>{option.mainText}</h3>
                    <p className={styles.subText}>{option.subText}</p>
                  </div>
                  <div>
                    <Switch onClick={option.handle} isSwitched={option.state} />
                  </div>
                </div>
              );
            })}

            <h2 className={styles.title}>Gameplay rules</h2>
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
