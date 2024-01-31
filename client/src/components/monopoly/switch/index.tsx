import React from "react";
import styles from "./style.module.scss";

type SwitchComponentProps = {
  onClick: () => void;
  isSwitched: boolean;
  disabled?: boolean;
};

const Switch: React.FC<SwitchComponentProps> = ({
  onClick,
  isSwitched,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div
      className={`
      ${styles.switchContainer} 
      ${isSwitched ? styles.switched : ""}
      ${disabled ? styles.disabled : ""}
      `}
      onClick={handleClick}
    >
      <div className={styles.switch}></div>
    </div>
  );
};

export default Switch;
