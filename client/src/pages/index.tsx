import Header from "@/components/layout/header";
import styles from "./style.module.scss";

const Home = () => {
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
