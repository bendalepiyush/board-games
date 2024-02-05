import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./style.module.scss";
import { useAuth } from "@/context/auth";
import { FaVolumeUp } from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { user, logout } = useAuth();

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

  const logoutUser = () => {
    logout();
  };

  return (
    <div className={styles.sticky}>
      <div className={styles.headerContainer}>
        <div>
          <FaVolumeUp color="rgba(255, 255, 255, 0.8)" size={24} />
        </div>
        <img src="/logo.svg" width={"100%"} />
        <div className={styles.rightAlign}>
          {user.username ? (
            <>
              <div className={styles.coins}>
                <RiCopperCoinFill size={18} />
                <span>1500</span>
              </div>
              <div className={styles.loginbutton}>
                <span>{user.username}</span>
              </div>
            </>
          ) : (
            <Link href={"/auth/login"}>
              <div className={styles.loginbutton}>
                <span>Login</span>
                <FiLogIn size={18} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
