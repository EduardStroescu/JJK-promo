import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  animateWatchNow,
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
      tl.add(animateWatchNow(outNowRef, scroll.ref));
      tl.add(animateWatchOn(watchOnRef, scroll.ref));

      tl.add(animateImage(heroRef), 0).add(revealVideo(videoRef));
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <>
      <div className={styles.hero} ref={heroRef}>
        <div data-image-overlay className={styles.hero__imageOverlay}></div>
        <div data-image className={styles.hero__image}></div>
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
    <div
      ref={watchOnRef}
      className={styles.watchOnSubtitle__container}
      // className="hidden translate-y-[0%] fixed top-0 left-0 bottom-0 right-0 opacity-0 w-full h-[100vh] pointer-events-none"
    >
      <div
        className={styles.watchOnSubtitle}
        //  className="flex items-center justify-start flex-col w-full pointer-events-none text-white gap-[4rem]"
      >
        <div>WATCH</div>
        <div className="-translate-y-[30%]">ON</div>
        <div className="w-full justify-center px-40 flex flex-row gap-10 -translate-y-[60%]">
          <a
            href="https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen"
            target="_blank"
            rel="noreferrer"
            className={styles.crunchyrollButton}
            // className="relative text-[4rem] p-12 border-[10px] border-orange-500 border-double rounded overflow-hidden z-[100]"
          >
            {/* <img
              src="/crunchyroll.webp"
              alt="Watch on Crunchyroll"
              className={styles.crunchyrollButton__img}
              // className="absolute scale-[1.4] -translate-y-[40%] -translate-x-[10%] z-[100]"
              loading="lazy"
            /> */}
            <p className="relative z-[200] text-black opacity-0">
              Crounchyroll
            </p>
          </a>
          <a
            href="https://www.funimation.com/shows/jujutsu-kaisen/"
            target="_blank"
            rel="noreferrer"
            className={styles.funimationButton}
            // className="relative text-[4rem] p-12 border-[10px] border-purple-500 border-double rounded overflow-hidden z-[100]"
          >
            {/* <img
              src="/funimation.webp"
              alt="Watch on funimation"
              className={styles.funimationButton__img}
              // className="absolute scale-[1.1] -translate-y-[43%] -translate-x-[10%] z-[100]"
              loading="lazy"
            /> */}
            <p className="relative z-[200] text-black opacity-0">Funimation</p>
          </a>
        </div>
      </div>
    </div>
  );
}
