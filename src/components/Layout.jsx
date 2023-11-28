import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { Loader } from "../pages";
import { StickyCursor } from "./StickyCursor/StickyCursor";
import { NavBar } from "./NavBar";
import { ScrollToTopButton } from "./scrollToTopButton/ScrollToTopButton";
import { LandscapePrompt } from "./LandscapePrompt";

export function Layout({ children }) {
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
      {loaderFinished ? (
        <>
          {window.innerWidth >= 1280 && <StickyCursor />}
          <ScrollToTopButton />
          <NavBar />
          {children}
          <Footer />
        </>
      ) : (
        <Loader timeline={timeline} />
      )}
      <LandscapePrompt />
    </>
  );
}

function Footer() {
  return (
    <footer data-footer className="footer">
      <p className="footer__title">Disclaimer:</p>
      <p className="footer__paragraph">
        This website is fan-made and dedicated to celebrating the anime and
        manga series &quot;Jujutsu Kaisen.&quot;
      </p>
      <p className="footer__paragraph">
        I do not own the copyrights or any intellectual property associated with
        Jujutsu Kaisen. All images, characters, logos, and other content are the
        property of their respective owners, including but not limited to Gege
        Akutami, Shueisha, MAPPA, and other related entities.
      </p>
      <p className="footer__paragraph">
        The purpose of this website is to provide information and promote the
        series. I strive to respect the original creators and their work. If you
        are the rightful owner of any content featured on this website and wish
        for it to be removed or credited differently, please contact me, and I
        will promptly address your concerns.
      </p>
    </footer>
  );
}
