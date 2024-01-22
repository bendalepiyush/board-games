import React, { useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";
import { CountryCard } from "@/maps/types";

const CardCountry: React.FC<CountryCard> = ({
  backgroundImageUrl,
  countryLogo,
  title,
  price,
  cardPosition,
  type,
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
        <div
          className={styles.headerContainer}
          style={{
            top: cardPosition === "bottom" ? `-${(width * 0.45) / 2}px` : 0,
            bottom: cardPosition === "top" ? `-${(width * 0.45) / 2}px` : 0,
            left: cardPosition === "right" ? `-${(width * 0.45) / 2}px` : 0,
            right: cardPosition === "left" ? `-${(width * 0.45) / 2}px` : 0,
          }}
        >
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
