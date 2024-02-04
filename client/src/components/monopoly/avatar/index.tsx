import React, { useState } from "react";
import styles from "./style.module.scss";

interface AvatarProps {
  containerLength?: number;
  topOffset?: number;
  color?: string;
  isHorizontalCard?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  containerLength = 30,
  topOffset = 0,
  color = "purple",
  isHorizontalCard = false,
}) => {
  const MAX_ZINDEX = 10;

  const handleMouseEnter = () => {
    setZindex(MAX_ZINDEX);
  };

  const handleMouseLeave = () => {
    setZindex(1);
  };

  const [zindex, setZindex] = useState<1 | number>(1);

  return (
    <div
      style={{
        height: `${containerLength}px`,
        width: `${containerLength}px`,
        top: `${isHorizontalCard ? 0 : topOffset}px`,
        left: `${isHorizontalCard ? topOffset : 0}px`,
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
