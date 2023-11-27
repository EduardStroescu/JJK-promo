import { useEffect, useState } from "react";

export function LandscapePrompt() {
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
      <div className="landscapePrompt">
        <p>
          For an optimal experience please use your device in landscape mode.
        </p>
      </div>
    );
}
