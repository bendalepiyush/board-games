import { ProtectRoute } from "@/components/protected-route";
import styles from "./style.module.scss";
import MonopolyBoard from "@/components/monopoly/board";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Switch from "@/components/monopoly/switch";
import { gql, useSubscription } from "@apollo/client";
import { makePostApiCall } from "@/js/api";
import MdiIcon from "@/components/mdi-icon";

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [role, setRole] = useState<string>("VIEWER");

  useEffect(() => {
    const joinGame = async (gameId: string) => {
      try {
        const res = await makePostApiCall("api/monopoly/join-game", {
          gameId,
        });

        setRole(res.data.role);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    if (id) {
      const gameId = Array.isArray(id) ? id[0] : id;
      joinGame(gameId);
    }
  }, [id]);

  const [privateRoom, setPrivateRoom] = useState<boolean>(true);
  const [auction, setAuction] = useState<boolean>(false);
  const [evenBuild, setEvenBuild] = useState<boolean>(false);
  const [noRentCollectionInPrison, setNoRentCollectionInPrison] =
    useState<boolean>(false);
  const [randomPlayerOrder, setRandomPlayerOrder] = useState<boolean>(false);
  const [vacationCashAllowed, setVacationCashAllowed] =
    useState<boolean>(false);
  const [x2RentOnFullSet, setX2RentOnFullSet] = useState<boolean>(false);

  const [maxPlayer, setMaxPlayer] = useState<number>(4);
  const maxPlayerOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ];

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

  const handleMaxPlayerChange = (event: any) => {
    setMaxPlayer(parseInt(event.target.value));
  };

  const options = [
    {
      type: "section",
      title: "Game settings",
    },
    {
      type: "select",
      mainText: "Maximum players",
      subText: "How many players can join the game",
      selectHandle: handleMaxPlayerChange,
      options: maxPlayerOptions,
      selectedOption: maxPlayer,
      icon: "account-group",
    },
    {
      type: "switch",
      mainText: "Private room",
      subText: "Private rooms can be accessed using the room URL only",
      handle: handlePrivateRoomToggle,
      state: privateRoom,
      icon: "key",
    },
    {
      type: "divider",
    },
    {
      type: "section",
      title: "Gameplay rules",
    },
    {
      type: "switch",
      mainText: "x2 rent on full-set properties",
      subText:
        "If a player owns a full property set, the base rent payment will be doubled",
      handle: handleX2RentOnFullSetToggle,
      state: x2RentOnFullSet,
      icon: "database",
    },
    {
      type: "switch",
      mainText: "Vacation cash",
      subText:
        "If a player lands on Vacation, all collected money from taxes and bank payments will be earned",
      handle: handleVacationCashAllowedToggle,
      state: vacationCashAllowed,
      icon: "vacation",
    },
    {
      type: "switch",
      mainText: "Auction",
      subText:
        "If someone skips purchasing the property landed on, it will be sold to the highest bidder",
      handle: handleAuctionToogle,
      state: auction,
      icon: "auction",
    },
    {
      type: "switch",
      mainText: "Don't collect rent while in prison",
      subText:
        "Rent will not be collected when landing on properties whose owners are in prison",
      handle: handleNoRentCollectionInPrisonToggle,
      state: noRentCollectionInPrison,
      icon: "down-trend",
    },
    {
      type: "switch",
      mainText: "Even build",
      subText:
        "Houses and hotels must be built up and sold off evenly within a property set",
      handle: handleEvenBuildToggle,
      state: evenBuild,
      icon: "house",
    },

    {
      type: "switch",
      mainText: "Randomize player order",
      subText: "Randomly reorder players at the beginning of the game",
      handle: handleRandomPlayerOrderToggle,
      state: randomPlayerOrder,
      icon: "sync",
    },
  ];

  const isInitialRender = useRef(true);

  useEffect(() => {
    const syncSettings = async () => {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }

      try {
        const res = await makePostApiCall("api/monopoly/update-game-settings", {
          gameId: id,
          maxPlayers: maxPlayer,
          privateRoom: privateRoom,
          x2RentOnFullSet: x2RentOnFullSet,
          vacationCashAllowed: vacationCashAllowed,
          auction: auction,
          noRentCollectionInPrison: noRentCollectionInPrison,
          evenBuild: evenBuild,
          randomPlayerOrder: randomPlayerOrder,
          onlyLoggedInUserAllowed: true,
          startingCash: 5000,
          currentVacationCash: 2000,
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (role === "ADMIN") {
      syncSettings();
    }
  }, [
    id,
    maxPlayer,
    privateRoom,
    x2RentOnFullSet,
    vacationCashAllowed,
    auction,
    noRentCollectionInPrison,
    evenBuild,
    randomPlayerOrder,
    role,
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
      const {
        maxPlayers,
        privateRoom,
        x2RentOnFullSet,
        vacationCashAllowed,
        auction,
        noRentCollectionInPrison,
        evenBuild,
        randomPlayerOrder,
      } = data.monopoly_game[0].settings;

      setMaxPlayer(maxPlayers);
      setPrivateRoom(privateRoom);
      setX2RentOnFullSet(x2RentOnFullSet);
      setVacationCashAllowed(vacationCashAllowed);
      setAuction(auction);
      setNoRentCollectionInPrison(noRentCollectionInPrison);
      setEvenBuild(evenBuild);
      setRandomPlayerOrder(randomPlayerOrder);
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
            {options.map((option, index) => {
              if (option.type === "section") {
                return (
                  <h2 key={index} className={styles.title}>
                    {option.title}
                  </h2>
                );
              }

              if (option.type === "select") {
                return (
                  <div className={styles.optionContainer} key={index}>
                    <div className={styles.icon}>
                      <MdiIcon icon={option.icon ? option.icon : ""} />
                    </div>
                    <div className={styles.textHolder}>
                      <h3 className={styles.option}>{option.mainText}</h3>
                      <p className={styles.subText}>{option.subText}</p>
                    </div>
                    <div>
                      <select
                        value={option.selectedOption}
                        onChange={option.selectHandle}
                      >
                        {option.options &&
                          option.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                );
              }

              if (option.type === "switch") {
                return (
                  <div className={styles.optionContainer} key={index}>
                    <div className={styles.icon}>
                      <MdiIcon icon={option.icon ? option.icon : ""} />
                    </div>
                    <div className={styles.textHolder}>
                      <h3 className={styles.option}>{option.mainText}</h3>
                      <p className={styles.subText}>{option.subText}</p>
                    </div>
                    <div>
                      <Switch
                        onClick={option.handle ? option.handle : () => {}}
                        isSwitched={option.state ? option.state : false}
                      />
                    </div>
                  </div>
                );
              }

              if (option.type === "divider") {
                return <div className={styles.divider} key={index}></div>;
              }
            })}
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
