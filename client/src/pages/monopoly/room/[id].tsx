import { ProtectRoute } from "@/components/protected-route";
import styles from "./style.module.scss";
import MonopolyBoard from "@/components/monopoly/board";
import { useAuth } from "@/context/auth";

const Room = () => {
  return (
    <ProtectRoute>
      <div className={styles.container}>
        <div>Left Section</div>
        <MonopolyBoard />
        <div>Right Section</div>
      </div>
    </ProtectRoute>
  );
};

export default Room;
