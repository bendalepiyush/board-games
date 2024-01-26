import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./style.module.scss";
import VolumeMuteIcon from "@/components/icons/volume-mute";
import CartIcon from "@/components/icons/cart";
import LoginIcon from "@/components/icons/login";
import LogoutIcon from "@/components/icons/logout";
import MenuIcon from "@/components/icons/menu";
import ActionButton from "../action-button";
import { useAuth } from "@/context/auth";

const AppHeader: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { user, logout } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const checkMobileView = () => {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 426;
      setIsMobile(isMobile);
    };

    checkMobileView();

    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);

  const toggleLoginDialog = () => {
    router.push("/auth/login");
  };

  const [showMenuDialog, setShowMenuDialog] = useState<boolean>(false);

  const toggleMenuDialog = () => {
    setShowLoginDialog(false);
    setShowMenuDialog(!showMenuDialog);
  };

  const logoutUser = () => {
    logout();
  };

  return (
    <div className={styles.headerContainer}>
      <ActionButton>
        <VolumeMuteIcon />
      </ActionButton>
      <h1 style={{ color: "white" }}>{user.username}</h1>
      <div className={styles.rightContainer}>
        {isMobile ? (
          <div onClick={toggleMenuDialog}>
            <ActionButton>
              <MenuIcon />
            </ActionButton>
          </div>
        ) : (
          <>
            <ActionButton text="Store">
              <CartIcon />
            </ActionButton>
            {user.token ? (
              <div onClick={logoutUser}>
                <ActionButton text="Logout">
                  <LogoutIcon />
                </ActionButton>
              </div>
            ) : (
              <div onClick={toggleLoginDialog}>
                <ActionButton text="Login">
                  <LoginIcon />
                </ActionButton>
              </div>
            )}
          </>
        )}

        {showLoginDialog && (
          <div className={styles.card}>
            <p>Choose a way to log in:</p>
            <p>Why login?</p>
          </div>
        )}

        {showMenuDialog && (
          <div className={styles.card}>
            <ActionButton text="Store">
              <CartIcon />
            </ActionButton>
            <div onClick={toggleLoginDialog}>
              <ActionButton text="Login">
                <LoginIcon />
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
