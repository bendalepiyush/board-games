import React, { useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";
import { CountryCard } from "@/maps/types";
import AvatarHolder from "../avatar-holder";

const CardCountry: React.FC<CountryCard> = ({
  backgroundImageUrl,
  countryLogo,
  title,
  price,
  cardPosition,
  type,
  position,
  playersMap,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(1);
  const [headerContainer, setHeaderContainer] = useState<any>();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const width = ref.current?.offsetWidth || 50;
      const height = ref.current?.offsetHeight || 50;

      const designedFor = 70;
      const smaller = width > height ? height : width;

      setWidth(smaller);
      setFontSize(smaller / designedFor);

      const marginOffset = `-${(smaller * 0.45) / 2}px`;

      switch (cardPosition) {
        case "top":
          setHeaderContainer({
            bottom: marginOffset,
          });
          break;
        case "bottom":
          setHeaderContainer({
            top: marginOffset,
          });
          break;
        case "left":
          setHeaderContainer({
            right: marginOffset,
          });
          break;
        case "right":
          setHeaderContainer({
            left: marginOffset,
          });
          break;
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

      <div
        className={styles.bgImage}
        style={{
          backgroundImage: `url('${backgroundImageUrl}')`,
        }}
      />

      <div
        className={`${styles.content}
                  ${cardPosition !== "top" && `${styles.reverse}`}
                  ${cardPosition === "right" && `${styles.right}`}
                  ${cardPosition === "left" && `${styles.left}`}
                `}
      >
        <div className={styles.priceContainer}>
          <div
            className={styles.priceTag}
            style={{
              fontSize: `${fontSize * 0.9}em`,
            }}
          >
            {price}
          </div>
        </div>
        <div className={styles.headerContainer} style={headerContainer}>
          <p
            className={styles.title}
            style={{
              fontSize: `${fontSize}em`,
            }}
          >
            {title}
          </p>
          <div className={styles.alignCenter}>
            <div
              className={styles.logoContainer}
              style={{
                backgroundImage: `url('${countryLogo}')`,
                width: `${width * 0.45}px`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCountry;
