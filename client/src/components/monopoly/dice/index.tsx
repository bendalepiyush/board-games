import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./style.module.scss";

const Dice = ({ number }: { number: number }) => {
  return (
    <div className={styles.diceContainer}>
      <div className={styles.face1} />
      <div className={styles.face2} />
      <div className={styles.face3} />
      <div className={styles.face4} />
      <div className={styles.face5} />
      <div className={styles.face6} />
    </div>
  );
};

export default Dice;
