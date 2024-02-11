import { ReactNode } from "react";
import styles from "./style.module.scss";

type ButtonProps = {
  children: ReactNode;
  onclick: () => void;
};

const Button = ({ children, onclick }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        onclick();
      }}
    >
      {children}
    </button>
  );
};

export default Button;
