import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import styles from "./style.module.scss";
import { BASE_URL } from "@/js/constant";
import AppHeader from "@/components/layout/app-header";
import KeyIcon from "@/components/icons/key";
import AccountIcon from "@/components/icons/account";

const Monopoly = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const signupUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
        username,
      });

      const tokenFromResponse = response.data.token;

      localStorage.setItem("token", tokenFromResponse);
      localStorage.setItem("username", username);

      setToken(tokenFromResponse);
      setLoggedInUsername(username);

      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const tokenFromResponse = response.data.token;
      const usernameFromResponse = response.data.username;

      localStorage.setItem("token", tokenFromResponse);
      localStorage.setItem("username", usernameFromResponse);

      setToken(tokenFromResponse);
      setLoggedInUsername(usernameFromResponse);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setToken(null);
    setLoggedInUsername(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setLoggedInUsername(storedUsername);
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <AppHeader />

      <div className={styles.mainBodyContainer}>
        <Image src="/dice.svg" width={200} height={200} alt="dice" />
        <h1>Board Games - Monopoly</h1>
        <h4>Rule the economy</h4>

        <input type="text" value="Salty Bay" />

        <br />
        <button className={styles.primaryButton}>Play</button>

        <div className={styles.secondaryButtonHolder}>
          <button className={styles.secondaryButton}>
            <AccountIcon />
            All rooms
          </button>
          <button className={styles.secondaryButton}>
            <KeyIcon />
            Create a private game
          </button>
        </div>
      </div>
      {/* 
      <div className={styles.header}>
        {token ? (
          <div>
            <p>User {loggedInUsername} is logged in!</p>
            <button onClick={logoutUser}>Logout</button>
          </div>
        ) : (
          <div>
         
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />

            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />

            <button onClick={signupUser}>Signup User</button>

            <br />
            <br />
            
            <label>Login Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />

            <label>Login Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <button onClick={loginUser}>Login</button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Monopoly;
