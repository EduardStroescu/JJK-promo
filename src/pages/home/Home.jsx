import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  animateOutNow,
  animateImage,
  revealVideo,
  animateShibuyaSubtitle,
  animateWatchOn,
} from "./animations";
import styles from "./home.module.scss";
import { useScrollContext } from "../../components/Scroll";
import { VideoBackground } from "../../components";

export function Home() {
  const timeline = useRef(gsap.timeline());
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const outNowRef = useRef(null);
  const watchOnRef = useRef(null);
  const shibuyaRef = useRef(null);
  const scroll = useScrollContext();

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;
      tl.add(animateShibuyaSubtitle(shibuyaRef, scroll.ref));
      tl.add(animateOutNow(outNowRef, scroll.ref));
      tl.add(animateWatchOn(watchOnRef, scroll.ref));

      tl.add(animateImage(heroRef), 0).add(revealVideo(videoRef));
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <>
      <div className={styles.hero} ref={heroRef}>
        <div data-image-overlay className={styles.hero__imageOverlay} />
        <div data-image className={styles.hero__image} />
      </div>
      <VideoBackground videoRef={videoRef} scroll={scroll} />
      <ShibuyaSubtitle shibuyaRef={shibuyaRef} />
      <OutNowSubtitle outNowRef={outNowRef} />
      <WatchOnSubtitle watchOnRef={watchOnRef} />
    </>
  );
}

function ShibuyaSubtitle({ shibuyaRef }) {
  return (
    <div ref={shibuyaRef} className={styles.shibuyaSubtitle__container}>
      <h2
        style={{ fontFamily: "Jujutsu Kaisen" }}
        className={styles.shibuyaSubtitle}
      >
        Shibuya Incident
      </h2>
    </div>
  );
}

function OutNowSubtitle({ outNowRef }) {
  return (
    <div ref={outNowRef} className={styles.outNowSubtitle}>
      <div>
        <img
          src="/textBackground.png"
          alt=""
          width="561"
          height="259"
          className={styles.outNowSubtitle__decoration}
          loading="lazy"
        />
        <h2 className={styles.outNowSubtitle__text}>OUT NOW</h2>
      </div>
    </div>
  );
}

function WatchOnSubtitle({ watchOnRef }) {
  return (
    <div ref={watchOnRef} className={styles.watchOnSubtitle__container}>
      <div className={styles.watchOnSubtitle}>
        <div className={styles.watchOnSubtitle__primaryText}>WATCH</div>
        <div className={styles.watchOnSubtitle__secondaryText}>ON</div>
        <div className={styles.promoButtonsContainer}>
          <a
            href="https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen"
            target="_blank"
            rel="noreferrer"
            className={styles.promoButtonsContainer__crunchyrollButton}
          >
            <p className={styles.hidden}>Crunchyroll</p>
          </a>
          <a
            href="https://www.funimation.com/shows/jujutsu-kaisen/"
            target="_blank"
            rel="noreferrer"
            className={styles.promoButtonsContainer__funimationButton}
          >
            <p className={styles.hidden}>Funimation</p>
          </a>
        </div>
      </div>
    </div>
  );
}
