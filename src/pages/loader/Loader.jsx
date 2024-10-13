import { useEffect, useRef } from "react";
import {
  animateTitleIn,
  introAnimation,
  animateLoaderOut,
  progressAnimation,
} from "./animations";
import styles from "./loader.module.scss";

export function Loader({ timeline }) {
  const loaderRef = useRef(null);
  const wordGroupsRef = useRef(null);
  const progressRef = useRef(null);
  const progressNumberRef = useRef(null);

  useEffect(() => {
    timeline &&
      timeline
        .add(animateTitleIn)
        .add(introAnimation(wordGroupsRef))
        .add(progressAnimation(progressRef, progressNumberRef), 0)
        .add(animateLoaderOut(loaderRef), ">");
  }, [timeline]);

  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader__progressWrapper}>
        <div className={styles.loader__progress} ref={progressRef}></div>
        <span className={styles.loader__progressNumber} ref={progressNumberRef}>
          0
        </span>
      </div>
      <div className={styles.loader} ref={loaderRef}>
        <div className={styles.loader__wheel}>
          <div data-flames className={styles.loader__wheel__flames}>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
            <div>
              <img src="/blueFireball.gif" width="343" height="488" alt="" />
            </div>
          </div>
        </div>

        <div className={styles.loader__titleWrapper} ref={wordGroupsRef}>
          <h1 className={styles.loader__title}>
            <div className={styles.loader__titleEnglish}>
              <span data-hidden data-title-first>
                Jujutsu
              </span>
              <span data-hidden data-title-second>
                Kaisen
              </span>
            </div>
            <span data-title-last>呪術廻戦</span>
          </h1>
          <h1 className={styles.loader__titleSecond}>
            <div className={styles.loader__titleEnglishSecond}>
              <span>Jujutsu</span>
              <span>Kaisen</span>
            </div>
            <span>呪術廻戦</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
