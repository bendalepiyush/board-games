/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";
import { CompanyCard } from "@/types/monopolyGame";
import AvatarHolder from "../avatar-holder";

const CardCompany: React.FC<CompanyCard> = ({
  backgroundImageUrl,
  countryLogo,
  title,
  price,
  cardPosition,
  type,
  position,
  playersMap,
  propertyMap,
}) => {
  const [width, setWidth] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(1);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const width = ref.current?.offsetWidth || 50;
      const height = ref.current?.offsetHeight || 50;

      const designedFor = 70;

      if (width > height) {
        setWidth(height);
        setFontSize(height / designedFor);
      } else {
        setWidth(width);
        setFontSize(width / designedFor);
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
          {propertyMap[position] === undefined ? (
            <div
              className={styles.priceTag}
              style={{
                fontSize: `${fontSize * 0.8}em`,
              }}
            >
              {price}
            </div>
          ) : (
            <div
              style={{ backgroundColor: propertyMap[position].color }}
              className={styles.colorContainer}
            />
          )}
        </div>
        <div className={styles.headerContainer}>
          <p
            className={styles.title}
            style={{
              fontSize: `${fontSize * 0.9}em`,
            }}
          >
            {title}
          </p>
          <img
            className={styles.logoContainer}
            src={countryLogo}
            width={width * 0.35}
            height={width * 0.35}
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
};

export default CardCompany;
