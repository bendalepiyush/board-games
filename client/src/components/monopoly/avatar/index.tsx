import React, { useState } from "react";
import styles from "./style.module.scss";

interface AvatarProps {
  containerLength?: number;
  topOffset?: number;
  color?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  containerLength = 30,
  topOffset = 0,
  color = "purple",
}) => {
  const MAX_ZINDEX = 10;

  const handleMouseEnter = () => {
    setZindex(MAX_ZINDEX);
  };

  const handleMouseLeave = () => {
    setZindex("auto");
  };

  const [zindex, setZindex] = useState<"auto" | number>("auto");

  return (
    <div
      style={{
        height: `${containerLength}px`,
        width: `${containerLength}px`,
        top: `${topOffset}px`,
        backgroundColor: color,
        zIndex: zindex,
      }}
      className={styles.avatar}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
};

export default Avatar;
