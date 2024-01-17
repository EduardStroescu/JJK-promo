import { useEffect } from "react";
import { useScrollContext } from "./Scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        ScrollTrigger.refresh();
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
    <video ref={videoRef} id="v0" preload="auto" muted>
      <source
        type="video/mp4"
        src="https://res.cloudinary.com/dkqbb07gx/video/upload/jjk/zihbdki13rjlcqpvpf7b.mp4"
      />
    </video>
  );
}
