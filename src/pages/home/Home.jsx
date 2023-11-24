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
  const watchNowRef = useRef(null);
  const watchOnRef = useRef(null);
  const shibuyaRef = useRef(null);
  const scroll = useScrollContext();

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;
      tl.add(animateShibuyaSubtitle(shibuyaRef, scroll.ref));
      tl.add(animateWatchNow(watchNowRef, scroll.ref));
      tl.add(animateWatchOn(watchOnRef, scroll.ref));

      tl.add(animateImage(heroRef), 0).add(revealVideo(videoRef));
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <div className="w-full h-full">
      <section className={styles.hero} ref={heroRef}>
        <div data-image-overlay className={styles.hero__imageOverlay}></div>
        <div data-image className={styles.hero__image}></div>
      </section>
      <VideoBackground videoRef={videoRef} scroll={scroll} />
      <div
        ref={shibuyaRef}
        className="translate-y-[75%] fixed top-0 left-0 bottom-0 right-0 opacity-0 w-full h-[100vh] pointer-events-none"
      >
        <div className="flex items-center justify-center flex-col w-full pointer-events-none text-white gap-[15rem]">
          <h2
            style={{ fontFamily: "Jujutsu Kaisen" }}
            className="text-[7rem] z-[100]"
          >
            Shibuya Incident
          </h2>
        </div>
      </div>
      <div
        ref={watchNowRef}
        className="hidden translate-y-[5%] fixed top-0 left-0 bottom-0 right-0 opacity-0 w-full h-[100vh] pointer-events-none "
      >
        <div className="flex items-center justify-center flex-col w-full pointer-events-none text-white gap-[10rem]">
          <img
            src="/textBackground.webp"
            alt=""
            className="absolute scale-[1.5] translate-x-[17rem] z-[100]"
            loading="lazy"
          />
          <h2 className="text-[15rem] z-[100] font-bold">OUT NOW</h2>
        </div>
      </div>
      <div
        ref={watchOnRef}
        className="hidden translate-y-[0%] fixed top-0 left-0 bottom-0 right-0 opacity-0 w-full h-[100vh] pointer-events-none"
      >
        <div className="flex items-center justify-start flex-col w-full pointer-events-none text-white gap-[4rem]">
          <h2 className="text-[15rem] z-[100] font-bold">WATCH</h2>
          <h3 className="text-[8rem] z-[100] font-bold">ON</h3>
          <div className="flex flex-row gap-10">
            <button className="relative text-[4rem] p-12 border-[10px] border-orange-500 border-double rounded overflow-hidden z-[100]">
              <img
                src="/crunchyroll.webp"
                alt="Watch on Crunchyroll"
                className="absolute scale-[1.4] -translate-y-[40%] -translate-x-[10%] z-[100]"
                loading="lazy"
              />
              <p className="relative z-[200] text-black opacity-0">
                Crounchyroll
              </p>
            </button>
            <a className="relative text-[4rem] p-12 border-[10px] border-purple-500 border-double rounded overflow-hidden z-[100]">
              <img
                src="/funimation.webp"
                alt="Watch on funimation"
                className="absolute scale-[1.1] -translate-y-[43%] -translate-x-[10%] z-[100]"
                loading="lazy"
              />
              <p className="relative z-[200] text-black opacity-0">
                Funimation
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
