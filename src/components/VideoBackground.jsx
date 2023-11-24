import { useEffect } from "react";
import { useScrollContext } from "./Scroll";

export function VideoBackground({ videoRef }) {
  const scroll = useScrollContext();

  useEffect(() => {
    const playbackConst = 90;

    if (videoRef.current) {
      const frameNumber = scroll.progress * playbackConst;
      videoRef.current.currentTime = frameNumber;
    }
  }, [scroll.progress]);

  useEffect(() => {
    const video = videoRef.current;

    function handleLoadedMetadata() {
      const { duration } = video;
      const playbackConst = 110;
      const scrollSection = scroll.ref;

      if (video) {
        scrollSection.style.height =
          Math.floor(duration) * playbackConst + "px";
      }
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);

      // Reset the scroll container's size when the component is unmounted
      const scrollSection = scroll.ref;
      scrollSection.style.height = "auto";
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} id="v0" preload="auto" muted>
        <source type="video/mp4" src="/trailer.mp4" />
      </video>
    </div>
  );
}
