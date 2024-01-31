import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import styles from "./style.module.scss";
import { SurpriseCard } from "@/maps/types";

const CardSurprise: React.FC<SurpriseCard> = ({
  cardPosition,
  imagePath,
  title,
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
    <div>S</div>
    // <div className={styles.container} ref={ref}>
    //   <div
    //     className={`${styles.content}
    //     ${cardPosition !== "top" && `${styles.reverse}`}
    //     ${cardPosition === "right" && `${styles.right}`}
    //     ${cardPosition === "left" && `${styles.left}`}
    //   `}
    //   >
    //     <p>{title}</p>
    //     <img width={"50px"} height={"50px"} src={imagePath} alt="" />
    //   </div>
    // </div>
  );
};

export default CardSurprise;
