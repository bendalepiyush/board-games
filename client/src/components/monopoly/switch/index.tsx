import React from "react";
import styles from "./style.module.scss";

type SwitchComponentProps = {
  onClick: () => void;
  isSwitched: boolean;
};

const Switch: React.FC<SwitchComponentProps> = ({ onClick, isSwitched }) => {
  return (
    <div
      className={`${styles.switchContainer} ${
        isSwitched ? styles.switched : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.switch}></div>
    </div>
  );
};

export default Switch;
