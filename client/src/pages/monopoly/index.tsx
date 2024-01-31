import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";
import styles from "./style.module.scss";
import KeyIcon from "@/components/icons/key";
import AccountIcon from "@/components/icons/account";
import axios from "axios";

const Monopoly = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState<string>("");

  // const subQuery = gql`
  //   subscription MySubscription {
  //     user {
  //       id
  //       status
  //     }
  //   }
  // `;

  // const { loading, error, data } = useSubscription(subQuery);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   console.error(error);
  //   return <div>Error!</div>;
  // }

  // console.log(data.user[0].status);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      router.replace("/auth/login");
    }

    if (user.username) {
      setUsername(user.username);
    }
  }, [user, router]);

  const playGame = () => {
    console.log("play game");
  };

  const onCreatePrivateGame = async () => {
    try {
      const res = await axios.post("api/monopoly/create-game", undefined, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      router.replace(`/monopoly/room/${res.data.gameId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainBodyContainer}>
        <Image src="/dice.svg" width={200} height={200} alt="dice" />
        <h1>Board Games - Monopoly</h1>
        <h4>Rule the economy</h4>

        <input type="text" value={username} disabled />

        <br />
        <button className={styles.primaryButton} onClick={playGame}>
          Play
        </button>

        <div className={styles.secondaryButtonHolder}>
          <button className={styles.secondaryButton}>
            <AccountIcon />
            All rooms
          </button>
          <button
            className={styles.secondaryButton}
            onClick={onCreatePrivateGame}
          >
            <KeyIcon />
            Create a private game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monopoly;
