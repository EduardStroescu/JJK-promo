import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { Loader } from "../pages";
import { StickyCursor } from "./StickyCursor/StickyCursor";
import { NavBar } from "./NavBar";
import { ScrollToTopButton } from "./scrollToTopButton/ScrollToTopButton";
import { LandscapePrompt } from "./LandscapePrompt";

export function Layout({ children }) {
  const [matchesOptimalWidth, setMatchesOptimalWidth] = useState(false);
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [timeline, setTimeline] = useState(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoaderFinished(true),
      });
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  return (
    <>
      <>
        {loaderFinished ? (
          <>
            {window.innerWidth >= 900 && <StickyCursor />}
            <ScrollToTopButton />
            <div className="absolute top-0 left-0 bg-[url('/header_bg.webp')] w-full h-[180px] bg-contain bg-bottom" />
            <NavBar />
            <div className="text-white">{children}</div>
            <Footer />
          </>
        ) : (
          <Loader timeline={timeline} />
        )}
      </>

      <LandscapePrompt setMatchesOptimalWidth={setMatchesOptimalWidth} />
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute w-full bottom-0 left-0 py-36 text-white bg-[url('/footer_bg.webp')] bg-cover bg-no-repeat">
      <p className="text-center translate-y-[4rem]">
        &copy; Akutami Gege/Shueisha/Jujutsu Kaisen Production Committee/Studio
        Mappa
      </p>
    </footer>
  );
}
