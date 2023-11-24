import { createContext, useRef, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scrollContext = createContext();
export const useScrollContext = () => useContext(scrollContext);

// const scroll = {
//   progress: 0,
//   ref: null,
//   lenis: null,
// };

export function Scroll({ children }) {
  const [scroll, setScroll] = useState({
    progress: 0,
    ref: null,
    lenis: null,
  });
  const wrapper = useRef(null);
  const content = useRef(null);
  const updateProgress = (newProgress) => {
    setScroll((prevScroll) => ({ ...prevScroll, progress: newProgress }));
  };

  // Function to update the 'ref' property
  const updateRef = (newRef) => {
    setScroll((prevScroll) => ({ ...prevScroll, ref: newRef }));
  };

  // Function to update the 'lenis' property
  const updateLenis = (newLenis) => {
    setScroll((prevScroll) => ({ ...prevScroll, lenis: newLenis }));
  };

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical", // vertical, horizontal, both
      duration: 5,
      normalizeWheel: true,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1,
      infinite: false,
    });

    updateRef(content.current);
    updateLenis(lenis);

    lenis.on("scroll", ({ progress }) => {
      ScrollTrigger.update(); // Update ScrollTrigger first
      updateProgress(progress); // Then update custom progress
    });

    gsap.ticker.add((time) => lenis.raf(time * 4000));
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.defaults({ scroller: wrapper.current });
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={wrapper}
      style={{
        position: "absolute",
        zIndex: 5,
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <div
        ref={content}
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <scrollContext.Provider value={scroll}>
          {children}
        </scrollContext.Provider>
      </div>
    </div>
  );
}
