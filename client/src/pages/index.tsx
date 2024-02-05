import Header from "@/components/layout/header";
import styles from "./style.module.scss";
import Lottie from "lottie-react";
import scrollAnimationLotti from "@/components/lotti/scroll.json";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Home = () => {
  const controls = useAnimation();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const shouldHide = scrollY > 1;
    console.log(scrollY);

    controls.start({ opacity: shouldHide ? 0 : 1 });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
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
                <button className={styles.button} role="button">
                  Play Now
                </button>
              </div>
            </div>
            <img src="/monopoly.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
