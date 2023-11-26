import { useEffect, useLayoutEffect, useState } from "react";

export function LandscapePrompt({ setMatchesOptimalWidth }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  if (windowWidth <= 600)
    return (
      <div className="fixed top-0 left-0 z-[999999999] bg-black w-full h-[100vh] flex flex-col items-center justify-center">
        <p className="text-6xl text-white text-center">
          For an optimal experience please use your device in landscape mode.
        </p>
      </div>
    );
}
