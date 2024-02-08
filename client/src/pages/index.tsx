import Header from "@/components/layout/header";
import styles from "./style.module.scss";
import Lottie from "lottie-react";
import scrollAnimationLotti from "@/components/lotti/scroll.json";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

const Home = () => {
  const target = useRef(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const shouldHide = latest > 0;
    console.log(shouldHide);

    controls.start({ opacity: shouldHide ? 0 : 1 });
  });

  return (
    <motion.div ref={target}>
      <div>
        <div className={styles.header}>
          <Header />
          <div className={styles.content}>
            <h1>The Universe of Board Game</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse dictum at massa nec venenatis.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 1 }}
            animate={controls}
            className={styles.scroll}
          >
            <Lottie animationData={scrollAnimationLotti} loop={true} />
          </motion.div>
        </div>

        <div className={styles.games}>
          <div className={styles.monopolycard}>
            <div className={styles.container}>
              <div className={styles.content}>
                <h2>Monopoly</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse dictum at massa nec venenatis.
                </p>
                <Link href={"/monopoly"}>
                  <button className={styles.button} role="button">
                    Play Now
                  </button>
                </Link>
              </div>
            </div>
            <img src="/monopoly.png" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
