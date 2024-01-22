import React, { ReactNode } from "react";

import styles from "./style.module.scss";

type ActionButtonProps = {
  text?: string;
  children: ReactNode;
};

const ActionButton: React.FC<ActionButtonProps> = ({ children, text }) => {
  return (
    <div>
      <div className={styles.actionIconContainer}>
        {children}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ActionButton;
