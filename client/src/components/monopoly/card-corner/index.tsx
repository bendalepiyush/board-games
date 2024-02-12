import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";
import { CornerCard } from "@/types/monopolyGame";

import AvatarHolder from "../avatar-holder";

const CornerCard: React.FC<CornerCard> = ({
  imagePath,
  title,
  position,
  playersMap,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(1);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const width = ref.current?.offsetWidth || 50;
      const height = ref.current?.offsetHeight || 50;

      const designedFor = 140;

      if (width > height) {
        setWidth(height);
        setFontSize((height * 0.9) / designedFor);
      } else {
        setWidth(width);
        setFontSize((width * 0.9) / designedFor);
      }
    });
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <div className={styles.container} ref={ref}>
      <AvatarHolder
        players={playersMap[position] === undefined ? [] : playersMap[position]}
        position={position}
      />

      <p className={styles.desc} style={{ fontSize: `${fontSize}em` }}>
        {title}
      </p>
      <Image
        width={width * 0.3}
        height={width * 0.3}
        src={imagePath}
        alt=""
        className={styles.logoContainer}
      />
    </div>
  );
};

export default CornerCard;
